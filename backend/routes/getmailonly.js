const express = require("express");
const router = express.Router();
const app = express();
const crypto = require("crypto");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const ang = require("randomstring");
const path = require("path");
const fs = require("fs");
let dest1 = path.join(__dirname, "../databases/database1.db");

const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/getemailonly", (req, res) => {
  let userid = req.body.userid;
  console.log(userid);
  db1.all(
    `SELECT email,name FROM users WHERE userid = '${userid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
      } else {
        console.log(result[0].name);
        res.send({ msg: result[0].name });
      }
    }
  );
});

module.exports = router;
