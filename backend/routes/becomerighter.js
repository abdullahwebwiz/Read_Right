const express = require("express");
const router = express.Router();
const app = express();
const crypto = require("crypto");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
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
app.use(
  fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 },
  })
);

router.post("/becomerighter", (req, res) => {
  let userid = req.body.userid;
  let rightername = req.body.rightername;
  let desc = req.body.desc;
  let link1 = req.body.link1;
  let link2 = req.body.link2;
  let link3 = req.body.link3;
  let link4 = req.body.link4;
  let img = req.files.img;
  let followers = 0;

  console.log(req.files.img);
  db1.all(
    `SELECT rightername FROM righters WHERE rightername = '${rightername}' `,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log("failed: " + err);
      } else {
        if (result == "") {
          db1.run(
            `INSERT INTO righters (righterid,rightername,desc,link1,link2,link3,link4,followers)
            VALUES('${userid}','${rightername}','${desc}','${link1}','${link2}','${link3}','${link4}',${followers})`,
            (err) => {
              if (err) {
                res.send({ msg: "failed" });
                console.log("failed: " + err);
              } else {
                db1.run(
                  `UPDATE users SET isrighter = 'yes' WHERE userid = '${userid}'`,
                  (err) => {
                    if (err) {
                      res.send({ msg: "failed" });
                      console.log("failed: " + err);
                    } else {
                      let dest2 = path.join(
                        __dirname,
                        "../righterimgs/pi_" +
                          rightername +
                          "." +
                          img.mimetype.replace("image/", "")
                      );
                      img.mv(dest2, (err) => {
                        if (err) {
                          res.send({ msg: "failed" });
                          console.log("failed: " + err);
                        } else {
                          res.send({ msg: "success" });
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send({ msg: "accountexist" });
        }
      }
    }
  );
});

module.exports = router;
