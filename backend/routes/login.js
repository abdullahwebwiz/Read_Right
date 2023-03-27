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

router.post("/login", (req, res) => {
  console.log("login reached");
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  db1.all(
    `SELECT password,userid FROM users WHERE email = '${email}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
      } else {
        if (result != "") {
          if (result[0].password == password) {
            res.send({ msg: "success", userid: result[0].userid });
          } else {
            res.send({ msg: "wrongpass" });
          }
        } else {
          res.send({ msg: "noaccount" });
        }
      }
    }
  );
});

module.exports = router;
