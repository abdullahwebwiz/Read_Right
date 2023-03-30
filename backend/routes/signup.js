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

const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});
const db2 = new sqlite3.Database(dest2, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/adduser", (req, res) => {
  console.log(req.body.personinfo);
  let userid = ang.generate({ length: 11, charset: "alphanumeric" });
  let name = req.body.personinfo.name;
  let email = req.body.personinfo.email;
  let password = req.body.personinfo.password;
  let country = req.body.personinfo.country;
  let city = req.body.personinfo.city;
  db1.all(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
    if (err) {
      res.send({ msg: "failed" });
      console.log("failed: " + err);
    } else {
      if (result == "") {
        db1.run(
          `INSERT INTO users (userid,name,email,password,country,city, isrighter) VALUES
        ('${userid}','${name}','${email}','${password}','${country}','${city}', 'no')`,
          (err) => {
            if (err) {
              res.send({ msg: "failed" });
              console.log("failed inserting." + err);
            }
            db2.run(
              `CREATE TABLE '${"historyofuser_" + userid}'
                (s_no INTEGER PRIMARY KEY NOT NULL,
                postid VARCHAR(250) NOT NULL,
                posttitle VARCHAR(250) NOT NULL,
                epoch VARCHAR(250) NOT NULL)`,
              (err) => {
                if (err) {
                  res.send({ msg: "failed" });
                  console.log("failed history " + err);
                }
                db2.run(
                  `CREATE TABLE '${"tagsofuser_" + userid}'
                    (s_no INTEGER PRIMARY KEY NOT NULL,
                    tag VARCHAR(20) NOT NULL)
                      `,
                  (err) => {
                    if (err) {
                      res.send({ msg: "failed" });
                      console.log("failed tags " + err);
                    }
                    db2.run(
                      `CREATE TABLE '${"followingsofuser_" + userid}'
                        (s_no INTEGER PRIMARY KEY NOT NULL,
                       following VARCHAR(100) NOT NULL)`,
                      (err) => {
                        if (err) {
                          res.send({ msg: "failed" });
                          console.log("failed following" + err);
                        }
                        res.send({ msg: "success" });
                        console.log("following table made");
                      }
                    );
                  }
                );
              }
            );
          }
        );
      } else {
        res.send({ msg: "accountexist" });
      }
    }
  });
});

module.exports = router;
