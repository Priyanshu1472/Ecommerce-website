const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const e = require("express");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "slidin",
});

app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "saddjiasofjidjsfcagcrsdfngcawyefngdm",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res.render("test");
});

app.get("/test", (req, res) => {
  res.render("test");
});

app.post("/test", (req, res) => {
  const { username, fullname } = req.body;
 db.query(
   "INSERT INTO usernames (username, fullname) VALUES (?, ?)",
   [username, fullname],
   (err, result) => {
     if (err) {
       console.error("Error inserting data into MySQL table:", err);
       return;
     }
     console.log("Inserted data:", username, fullname);
     res.render("index", { message: "User added successfully" });
   }
 );
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.post("/index", (req, res) => {
  res.render("index");
});