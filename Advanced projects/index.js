const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
var Express = require("express");
var multer = require("multer");
var bodyParser = require("body-parser");
const mysql = require("mysql2");
const ejs = require("ejs");                                                                                   
const { get } = require("http");
// var http = require("http");
// var fs = require("fs");
const route = require("color-convert/route");
const { outer } = require("express");
const { homedir } = require("os");
//router.get("/", function (req, res) {
  //res.render('home.html');
//});
//router.get("/patient_registration", function (req, res) {
 // res.render("patient_registration.html");
//});
//router.get("/patient_login", function (req, res) {
 //res.render("patient_login.html");
////});
//router.get("/doctor_registration", function (req, res) {
//  res.render("doctor_registration.html");
///});
//router.get("/doctor_login", function (req, res) {
 // res.render("doctor_login.html");
//});

// var publicDir = require("path").join(__dirname, "/public");

//Injecting CSS and Images in webpage

//app.use(express.static(__dirname + '/images'));

//established server
//http.createServer(function (req, res) {
  //fs.readFile("home.html", function (err, html) {
    //res.writeHead(200, { "Content-Type": "text/html" });
    //res.write(html);
    //res.end();
  //});
//});

//test the server on port 5000
//.use("/", router);
app.listen(process.env.port || 5000);
console.log("runing at port 5000");

//database connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vidya@1996",
  database: "patient_registration",
});

//test the connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection Successfull");
});

//writing a middleware to setup view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.set('views', path.join(__dirname, '/'));


//render the user_index page
app.get("/", (req, res) => {
  let sql = "select * from user";
  let qry = connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("user_index", {
      title: "Online_Clinic",
      user: rows
    });
  });
});

//render add page - user_add
app.get('/addrecord',(req,res)=>{
  res.render("user_add",{
  title : "patient_name"
  });z
});

//after user clicks on save button - insert the record in table
app.post("/save",(req,res)=>{
  let data = {srno : req.body.srno, patient_name: req.body.patient_name, contactno: req.body.contactno,email: req.body.email,department: req.body.department,age: req.body.age, address:req.body.address};
  let sql = "INSERT INTO user SET ?";
  let qry = connection.query(sql,data,(err,rows)=>{
      if(err) throw err;
      res.redirect('/');
  });
});

//after the user clicks on edit button
app.get("/edit/:srno",(req,res)=>{
  const userrNo = req.params.srno;
  let sql = "SELECT * FROM user WHERE srno = ?";
  let qry = connection.query(sql,[userrNo],(err,rows)=>{
      if(err) throw err;
      res.render("user_edit",{
          title : "Edit PATIENT",
          user: rows[0]
      });
});
});

//after user clicks on save button of user edit page - update the record
app.post("/save_edit",(req,res)=>{   
  let sql = "UPDATE user SET  patient_name = ?, contactno = ?,email = ?,department=?, age=?, address = ? where srno = ?";
  let qry = connection.query(sql,[req.body.patient_name, req.body.contactno,req.body.email, req.body.department,req.body.age, req.body.address, req.body.srno],(err,rows)=>{
      if(err) throw err;
      res.redirect('/');
  });
});

//after the user clicks on delete button
app.get("/delete/:srno",(req,res)=>{
  let sql = "DELETE FROM user WHERE srno = ?";
  let qry = connection.query(sql,[req.params.srno],(err,rows)=>{
      if(err) throw err;
      res.redirect('/');
  });
});
  