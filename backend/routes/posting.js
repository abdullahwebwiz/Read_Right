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
let dest2 = path.join(__dirname, "../databases/database3.db");

const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});
const db2 = new sqlite3.Database(dest2, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/savepost", (req, res) => {
  let righterid = req.body.righterid;
  let posttitle = req.body.posttitle;
  let posttaglist = req.body.posttaglist.split(",");
  let postthumbnail = req.files.postthumbnail;
  let postbody = req.body.postbody;
  let filetype = req.files.postthumbnail.mimetype;
  let epoch = "none";
  let ispublished = "no";
  let reads = 0;

  if (req.body.postid == "none") {
    let postid = shuffle(uuid.v4().replace(/-/g, "").split(""))
      .slice(0, 12)
      .toString()
      .replace(/,/g, "");

    db1.run(
      `INSERT INTO postrecords (postid,posttitle,postbody,righterid,epoch,ispublished,filetype,reads,updated,tags,tag1,tag2,tag3,tag4,tag5) VALUES
    ('${postid}','${posttitle}',
    '${postbody}','${righterid}',
    '${epoch}','${ispublished}',
    '${filetype}','${reads}',
'${"none"}',
    '${posttaglist}',
    '${posttaglist[0] ? posttaglist[0].toString() : "notag"}',
    '${posttaglist[1] ? posttaglist[0].toString() : "notag"}',
    '${posttaglist[2] ? posttaglist[0].toString() : "notag"}',
    '${posttaglist[3] ? posttaglist[0].toString() : "notag"}',
    '${posttaglist[4] ? posttaglist[0].toString() : "notag"}'
    )`,
      (err) => {
        if (err) {
          res.send({ msg: "failed" });
          console.log("failed: " + err);
        } else {
          let dest2 = path.join(
            __dirname,
            "../postthumbnails/" + postid + "." + filetype.replace("image/", "")
          );
          postthumbnail.mv(dest2, (err) => {
            if (err) {
              res.send({ msg: "failed" });
              console.log("failed: " + err);
            } else {
              db2.run(
                `CREATE TABLE '${
                  "commentsof" + postid
                }' (s_no INTEGER PRIMARY KEY NOT NULL, 
                    username VARCHAR(250) NOT NULL,
                     userid VARCHAR(250) NOT NULL,
                      comment VARCHAR(250) NOT NULL)`,
                (err) => {
                  if (err) {
                    console.log(err);
                    res.send({ msg: "failed" });
                  } else {
                    res.send({ msg: "success", postid: postid });
                  }
                }
              );
            }
          });
        }
      }
    );
  } else {
    db1.run(
      `UPDATE postrecords SET posttitle = '${posttitle}',
                                    postbody = '${postbody}',
                                    filetype ='${filetype}',
                                    tags = '${posttaglist}',
                                    tag1 = '${tag1}',
                                    tag2 = '${tag2}',
                                    tag3 = '${tag3}',
                                    tag4 = '${tag4}',
                                    tag5 = '${tag5}'
                                    WHERE postid = '${req.body.postid}'`,
      (err) => {
        if (err) {
          console.log(err);
          res.send({ msg: failed });
        } else {
          res.send({ msg: "success2" });
        }
      }
    );
  }
});

router.post("/publishpost", (req, res) => {
  let postid = req.body.postid;
  let epoch = Date.now();
  db1.run(
    `UPDATE postrecords SET ispublished = 'yes',epoch = '${epoch}' WHERE postid='${postid}'`,
    (err) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log("failed: " + err);
      } else {
        res.send({ msg: "success" });
      }
    }
  );
});

router.post("/updatepost", (req, res) => {
  let postid = req.body.postid;
  let posttitle = req.body.posttitle;
  let posttaglist = req.body.posttaglist.split(",");
  let postthumbnail = req.files.postthumbnail;
  let postbody = req.body.postbody;
  let filetype = req.files.postthumbnail.mimetype;
  let epoch = Date.now();

  db1.run(
    `UPDATE postrecords SET     postbody = '${postbody}',
                                posttitle = '${posttitle}',
                                tags = '${posttaglist}',
                                updated = '${epoch}'
                                WHERE postid = '${postid}'`,
    (err) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        let dest2 = path.join(
          __dirname,
          "../postthumbnails/" + postid + "." + filetype.replace("image/", "")
        );
        fs.unlink(dest2, (err) => {
          if (err) {
            console.log(err);
            res.send({ msg: "failed" });
          } else {
            postthumbnail.mv(dest2, (err) => {
              if (err) {
                res.send({ msg: "failed" });
                console.log("failed: " + err);
              } else {
                res.send({ msg: "success" });
              }
            });
          }
        });
      }
    }
  );
});

router.post("/deletepost", (req, res) => {
  let postid = req.body.postid;
  let imgtype = req.body.imgtype;
  db1.run(`DELETE FROM postrecords WHERE postid = '${postid}'`, (err) => {
    if (err) {
      res.send({ msg: "failed" });
      console.log(err);
    } else {
      let dest2 = path.join(
        __dirname,
        "../postthumbnails/" + postid + "." + imgtype.replace("image/", "")
      );
      fs.unlink(dest2, (err) => {
        if (err) {
          console.log(err);
          res.send({ msg: "failed" });
        } else {
          res.send({ msg: "success" });
        }
      });
    }
  });
});


router.post("/unpublishpost", (req, res) => {
  let postid = req.body.postid;
  db1.run(
    `UPDATE postrecords SET ispublished = 'no' WHERE postid = '${postid}'`,
    (err) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        res.send({ msg: "success" });
      }
    }
  );
});
router.post("/publishpostnow", (req, res) => {
  let postid = req.body.postid;
  db1.run(
    `UPDATE postrecords SET ispublished = 'yes' WHERE postid = '${postid}'`,
    (err) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        res.send({ msg: "success" });
      }
    }
  );
});

module.exports = router;
