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
let dest2 = path.join(__dirname, "../databases/database2.db");
let dest3 = path.join(__dirname, "../databases/database3.db");

const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});
const db2 = new sqlite3.Database(dest2, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});
const db3 = new sqlite3.Database(dest3, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/addcomment", (req, res) => {
  let userid = req.body.userid;
  let comment = req.body.comment;
  let postid = req.body.postid;

  db1.all(
    `SELECT name FROM users WHERE userid = '${userid}'`,
    (err, result1) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        let username = result1[0].name;
        db3.run(
          `INSERT INTO '${
            "commentsof" + postid
          }' (userid,username,comment)VALUES('${userid}','${username}','${comment}')`,
          (err) => {
            if (err) {
              res.send({ msg: "failed" });
              console.log(err);
            } else {
              res.send({ msg: "success", name: username });
            }
          }
        );
      }
    }
  );
});

router.post("/deletecomment", (req, res) => {
    console.log('deletecomment reached.');
  let s_no = req.body.s_no;
  let postid = req.body.postid;
  db3.run(
    `DELETE FROM '${"commentsof" + postid}' WHERE s_no = ${s_no}`,
    (err) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        res.send({ msg: "success" });
      }
    }
  );
});

module.exports = router;
