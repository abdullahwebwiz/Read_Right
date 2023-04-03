// ===================modules===============================
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const expressFilupload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const uuid = require("uuid");
const shuffle = require("shuffle-array");
const app = express();
const dest = require("../config/destination");

// =================middlewares==============================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dest.public));
dotenv.config({ path: dest.env });
app.use(cors({ origin: "*", optionsSuccessStatus: 200, credentials: true }));
app.use(
  expressFilupload({
    limits: { fileSize: 500 * 1024 * 1024 },
  })
);
// ========================== routes ==========================

let data1 = require("../routes/countrycity");
let data2 = require("../routes/checkotp");
let data3 = require("../routes/signup");
let data4 = require("../routes/forgotpassword");
let data5 = require("../routes/login");
let data6 = require("../routes/getonly");
let data7 = require("../routes/becomerighter");
let data8 = require('../routes/posting');

app.use("/csc", data1);
app.use("/otp", data2);
app.use("/signup", data3);
app.use("/forgotpassword", data4);
app.use("/login", data5);
app.use("/getonly", data6);
app.use("/becomerighter", data7);
app.use("/posting", data8);

app.get("/", (req, res) => {
  res.send({ msg: "success" });
});

let port = process.env.PORT || 3500;
app.listen(port, (err) => {
  if (err) console.log("failed to listen" + err);
  console.log("success listening " + port);
});
