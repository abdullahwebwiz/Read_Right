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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

router.post("/checkrighter", (req, res) => {
  let righterid = req.body.righterid;
  db1.all(
    `SELECT * FROM righters WHERE righterid = '${righterid}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        if (result != "") {
          res.send(result[0]);
        } else {
          res.send({ msg: "notrighter" });
        }
      }
    }
  );
});

router.post("/updaterighter", (req, res) => {
  let userid = req.body.userid;
  let rightername = req.body.rightername;
  let desc = req.body.desc;
  let link1 = req.body.link1;
  let link2 = req.body.link2;
  let link3 = req.body.link3;
  let link4 = req.body.link4;
  let link5 = req.body.link5;
  let img = req.files.img;
  let filetype = req.files.img.mimetype;

  db1.all(
    `SELECT righterid FROM righters WHERE rightername = '${rightername}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        if (result.length > 1) {
          res.send({ msg: "nameexist" });
        } else {
          db1.all(
            `SELECT rightername,filetype FROM righters WHERE righterid = '${userid}'`,
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({ msg: "failed" });
              } else {
                let dest1 = path.join(
                  __dirname,
                  "../righterimgs/" +
                    result[0].rightername +
                    "." +
                    result[0].filetype.replace("image/", "")
                );
                let dest2 = path.join(
                  __dirname,
                  "../righterimgs/" +
                    rightername +
                    "." +
                    filetype.replace("image/", "")
                );

                fs.unlink(dest1, (err) => {
                  if (err) {
                    res.send({ msg: "failed" });
                    console.log(err);
                  } else {
                    img.mv(dest2, (err) => {
                      if (err) {
                        res.send({ msg: "failed" });
                        console.log("failed: " + err);
                      } else {
                        db1.run(
                          `UPDATE righters SET       rightername = '${rightername}',
                                                     desc = '${desc}',
                                                     link1 = '${link1}',
                                                     link2 = '${link2}',
                                                     link3 = '${link3}',
                                                     link4 = '${link4}',
                                                     link5 = '${link5}',
                                                     filetype = '${filetype}' 
                                                     WHERE righterid = '${userid}'`,
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
                    });
                  }
                });
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
