// ===================modules===============================
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const expressFilupload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
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
app.use("/csc", data1);
app.use("/otp", data2);

app.get("/", (req, res) => {
  res.send({ msg: "success" });
});

let port = process.env.PORT || 3500;
app.listen(port, (err) => {
  if (err) console.log("failed to listen" + err);
  console.log("success listening " + port);
});
