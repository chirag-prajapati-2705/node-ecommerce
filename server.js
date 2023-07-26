// var http = require("http");
// http
//   .createServer(function (req, res) {
//     //res.writeHead(200, { "Content-Type": "text/plain" });
//     res.write("Hello World!");
//     res.end();
//   })
//   .listen(8080);

const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect("mongodb://localhost:27017/usersdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Users Route

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`This is the port Number ${port}`);
});
