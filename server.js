require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { client } = require("./db");

const app = express();
const PORT = 8080;

client.connect();

//Middleware

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("bodyloggerstart");
  console.log(req.body);
  console.log("bodyloggerend");
  next();
});

//router

//error handler

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log("the server is up on PORT", PORT);
});
