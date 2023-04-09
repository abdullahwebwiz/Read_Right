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

router.post("/homeposts", (req, res) => {
  db1.all(
    `SELECT 
    postrecords.postid,
    postrecords.posttitle,
    postrecords.epoch,
    postrecords.filetype AS pfiletype, 
    postrecords.reads,
    righters.rightername,
    righters.filetype AS rfiletype,
    righters.readers
  FROM postrecords INNER JOIN righters ON postrecords.righterid = righters.righterid`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        if (result != "") {
          res.send({ msg: result });
          console.log(result);
        } else {
          res.send({ msg: "notfound" });
        }
      }
    }
  );
});

module.exports = router;
