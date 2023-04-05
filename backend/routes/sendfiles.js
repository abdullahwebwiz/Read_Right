const express = require("express");
const router = express.Router();
const app = express();
const crypto = require("crypto");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const ang = require("randomstring");
const uuid = require("uuid");
const path = require("path");
const shuffle = require("shuffle-array");
const fs = require("fs");
let dest1 = path.join(__dirname, "../databases/database1.db");

const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;
