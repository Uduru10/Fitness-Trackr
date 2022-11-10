require("dotenv").config();
// const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { COOKIE_SECRET } = process.env;
const { authRequired } = require("./routes/utils");
const client = require("./db/client");

const app = express();
const PORT = 8080;

client.connect();

const router = require("./routes");
//Middleware

app.use(morgan("dev"));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "./client", "dist")));
//router

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
// });

app.get("/test", authRequired, (req, res, next) => {
  res.send("You are authorized");
});

//error handler
app.use("/api", router);
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log("the server is up on PORT", PORT);
});
