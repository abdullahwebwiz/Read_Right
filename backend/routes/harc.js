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

router.post("/addhistory", (req, res) => {
  let user = req.body.user;
  let postid = req.body.postid;
  let posttitle = req.body.posttitle;
  let epoch = Date.now();

  db2.all(
    `SELECT * FROM '${"historyofuser" + user}' WHERE postid = '${postid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        if (result == "") {
          db2.run(
            `INSERT INTO '${
              "historyofuser" + user
            }' (posttitle,postid,epoch)VALUES('${posttitle}','${postid}','${epoch}')`,
            (err) => {
              if (err) {
                res.send({ msg: "failed" });
                console.log(err);
              } else {
                res.send({ msg: "success" });
              }
            }
          );
        } else {
          db2.run(
            `UPDATE '${
              "historyofuser" + user
            }' SET epoch = '${epoch}' WHERE postid = '${postid}'`,
            (err) => {
              if (err) {
                res.send({ msg: "failed" });
                console.log(err);
              } else {
                res.send({ msg: "success" });
              }
            }
          );
        }
      }
    }
  );
});

router.post("/readsinc", (req, res) => {
  let postid = req.body.postid;
  db1.all(
    `SELECT reads FROM postrecords WHERE postid = '${postid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        db1.run(
          `UPDATE postrecords SET reads = '${
            result[0].reads + 1
          }' WHERE postid='${postid}'`,
          (err) => {
            if (err) {
              res.send({ msg: "failed" });
              console.log(err);
            } else {
              res.send({ msg: "success" });
            }
          }
        );
      }
    }
  );
});

router.post("/gethistory", (req, res) => {
  let user = req.body.user;
  db2.all(`SELECT * FROM '${"historyofuser" + user}'`, (err, result) => {
    if (err) {
      res.send({ msg: "failed" });
      console.log(err);
    } else {
      res.send({ msg: result });
    }
  });
});

router.post("/remhis", (req, res) => {
  let postid = req.body.postid;
  let user = req.body.user;
  db2.run(
    `DELETE FROM '${"historyofuser" + user}' WHERE postid = '${postid}'`,
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;
