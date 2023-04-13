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

const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});
const db2 = new sqlite3.Database(dest2, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/checkfollowing", (req, res) => {
  let user = req.body.user;
  let righter = req.body.righter;

  db2.all(
    `SELECT * FROM '${
      "followingsofuser" + user
    }' WHERE following = '${righter}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        if (result != "") {
          res.send({ msg: "yesfollowing" });
        } else {
          res.send({ msg: "nofollowing" });
        }
      }
    }
  );
});

router.post("/followact", (req, res) => {
  console.log("following act reached.");
  let user = req.body.user;
  let righter = req.body.righter;

  db2.all(
    `SELECT * FROM '${
      "followingsofuser" + user
    }' WHERE following = '${righter}'`,
    (err, result1) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        if (result1 != "") {
          db2.run(
            `DELETE FROM '${
              "followingsofuser" + user
            }' WHERE following = '${righter}'`,
            (err) => {
              if (err) {
                console.log(err);
                res.send({ msg: "failed" });
              } else {
                console.log("lolo: " + righter);
                db1.all(
                  `SELECT readers FROM righters WHERE rightername = '${righter}'`,
                  (err, result2) => {
                    if (err) {
                      console.log(err);
                      res.send({ msg: "failed" });
                    } else {
                      console.log(result2);
                      db1.run(
                        `UPDATE righters SET readers = '${
                          result2[0].readers - 1
                        }' WHERE rightername= '${righter}'`,
                        (err) => {
                          if (err) {
                            console.log(err);
                            res.send({ msg: "failed" });
                          } else {
                            res.send({ msg: "unreadsuccess" });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          db2.run(
            `INSERT INTO '${
              "followingsofuser" + user
            }'(following) VALUES ('${righter}') `,
            (err) => {
              if (err) {
                console.log(err);
                res.send({ msg: "failed" });
              } else {
                console.log("lolo: " + righter);
                db1.all(
                  `SELECT readers FROM righters WHERE rightername = '${righter}' `,
                  (err, result2) => {
                    if (err) {
                      console.log(err);
                      res.send({ msg: "failed" });
                    } else {
                      console.log(result2);
                      db1.run(
                        `UPDATE righters SET readers = '${
                          result2[0].readers + 1
                        }' WHERE rightername = '${righter}'`,
                        (err) => {
                          if (err) {
                            console.log(err);
                            res.send({ msg: "failed" });
                          } else {
                            res.send({ msg: "readsuccess" });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
