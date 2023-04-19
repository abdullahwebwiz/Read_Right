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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/nameemailonly", (req, res) => {
  let userid = req.body.userid;

  db1.all(
    `SELECT email,name,isrighter FROM users WHERE userid = '${userid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
      } else {
        if (result != "") {
          console.log(result[0]);
          res.send({ msg: result[0].name, isrighter: result[0].isrighter });
        } else {
          res.send({ msg: "No Account" });
        }
      }
    }
  );
});

router.post("/getrighterdata", (req, res) => {
  console.log("getrighterdata reached");
  let righterid = req.body.righterid;
  let rname = req.body.rname;

  let x1 = ` rightername = '${rname ? rname.replace("@", "") : ""}'`;
  let x2 = ` righterid = '${righterid}'`;

  let query = `SELECT * FROM righters WHERE  ${rname ? x1 : x2}`;

  db1.all(query, (err, result) => {
    if (err) {
      res.send({ msg: "failed" });
      console.log(err);
    } else {
      console.log(result);
      if (result != "") {
        let data = result[0];
        let dest = path.join(
          __dirname,
          "../righterimgs/" +
            data.rightername +
            "." +
            data.filetype.toString().replace("image/", "")
        );

        fs.readFile(dest, (err, data) => {
          if (err) {
            res.send({ msg: "failed" });
            console.log(err);
          } else {
            let base64Image = new Buffer.from(data, "binary").toString(
              "base64"
            );

            res.send({ msg: result[0], pimg: base64Image });
          }
        });
      } else {
        res.send({ msg: "notfound" });
      }
    }
  });
});

router.post("/postdata", (req, res) => {
  let postid = req.body.postid;

  db1.all(
    `SELECT 
    postrecords.postid,
    postrecords.posttitle,
    postrecords.postbody,
    postrecords.epoch,
    postrecords.filetype AS pfiletype, 
    postrecords.reads,
    postrecords.tags,
    postrecords.updated,
    righters.righterid,
    righters.rightername,
    righters.filetype AS rfiletype,
    righters.readers,
    righters.link1,
    righters.link2,
    righters.link3,
    righters.link4,
    righters.link5,
    righters.desc
     FROM postrecords INNER JOIN righters 
     ON postrecords.righterid = righters.righterid WHERE postrecords.postid = '${postid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        if (result != "") {
          res.send({ msg: result[0] });
        } else {
          res.send({ msg: "notfound" });
        }
      }
    }
  );
});

router.post("/getposts", (req, res) => {
  let righterid = req.body.righterid;
  let rname = req.body.rname;
  let postfilter = req.body.postfilter;
  console.log(righterid);

  let x1 = ` righters.rightername = '${rname ? rname.replace("@", "") : ""}'`;
  let x2 = ` righters.righterid = '${righterid}'`;
  let recent = ` ORDER BY epoch DESC`;
  let popular = ` ORDER BY reads DESC`;

  db1.all(
    `SELECT 
    postrecords.postid,
    postrecords.posttitle,
    postrecords.epoch,
    postrecords.filetype AS pfiletype, 
    postrecords.reads,
    postrecords.ispublished,
    righters.rightername,
    righters.filetype AS rfiletype,
    righters.readers
    FROM postrecords INNER JOIN righters ON postrecords.righterid = righters.righterid WHERE ${
      rname ? x1 : x2
    } ${postfilter == "Recent" ? recent : popular}`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
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

router.post("/gettenrighterposts", (req, res) => {
  let righterid = req.body.righterid;
  console.log(req.body.righterid);
  db1.all(
    `SELECT * FROM postrecords  WHERE righterid = '${righterid}' ORDER BY reads DESC LIMIT 10`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        res.send({ msg: result });
        console.log(result);
      }
    }
  );
});

router.post("/gettenranposts", (req, res) => {
  db1.all(
    `SELECT * FROM postrecords ORDER BY reads DESC LIMIT 10`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        res.send({ msg: result });
      }
    }
  );
});

router.get("/tagnames", (req, res) => {
  db1.all(`SELECT * FROM tagnames`, (err, result) => {
    res.send({ msg: result });
  });
});

router.post("/checkisrighter", (req, res) => {
  let userid = req.body.userid;

  db1.all(
    `SELECT s_no FROM righters WHERE righterid = '${userid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        if (result != "") {
          res.send({ msg: true });
          console.log(result);
        } else {
          res.send({ msg: false });
        }
      }
    }
  );
});

router.post("/getrighterinfo", (req, res) => {
  let righterid = req.body.righterid;
  db1.all(
    `SELECT filetype, rightername FROM righters WHERE righterid = '${righterid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        res.send({ msg: result[0] });
      }
    }
  );
});

router.post("/postcomments", (req, res) => {
  let postid = req.body.postid;
  let sp = req.body.sp;
  let ep = req.body.ep;

  db3.all(`SELECT * FROM '${"commentsof" + postid}'`, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ msg: "failed" });
    } else {
      if (result != "") {
        res.send({ msg: result.slice(sp, ep) });
      } else {
        res.send({ msg: "failed" });
      }
    }
  });
});

router.post("/tagposts", (req, res) => {
  let tagname = req.body.tagname;
  db1.all(
    `SELECT postrecords.postid,
    postrecords.posttitle,
    postrecords.epoch,
    postrecords.filetype AS pfiletype, 
    postrecords.reads,
    righters.rightername,
    righters.filetype AS rfiletype,
    righters.readers  
    FROM postrecords INNER JOIN righters ON postrecords.righterid = righters.righterid
                               WHERE (tag1 = '${tagname}' OR 
                                      tag2 = '${tagname}' OR 
                                      tag3 = '${tagname}' OR 
                                      tag4 = '${tagname}' OR 
                                      tag5 = '${tagname}')`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ msg: "failed" });
      } else {
        if (result != "") {
          res.send({ msg: result });
        } else {
          res.send({ msg: "failed" });
        }
      }
    }
  );
});

router.post("/submitreport", (req, res) => {
  console.log(req.body);
  let user = req.body.user;
  let subject = req.body.subject;
  let message = req.body.message;
  db1.run(
    `INSERT INTO reports (user,subject,message)VALUES('${user}','${subject}','${message}')`,
    (err) => {
      if (err) {
        res.send({ msg: "failed" });
      } else {
        res.send({ msg: "success" });
      }
    }
  );
});

router.post("/gpdfu", (req, res) => {
  let postid = req.body.postid;
  db1.all(
    `SELECT postid,postbody, posttitle, tags FROM postrecords WHERE postid = '${postid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        res.send({ msg: result[0] });
      }
    }
  );
});

router.post("/savedpostlist", (req, res) => {
  console.log("Savedpostlist reached");
  let postid = req.body.postid;
  console.log(postid);
  db1.all(
    `SELECT * FROM postrecords WHERE postid = '${postid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
        let dest = path.join(
          __dirname,
          "../postthumbnails/" +
            result[0].postid +
            "." +
            result[0].filetype.toString().replace("image/", "")
        );
        fs.readFile(dest, (err, data) => {
          if (err) {
            res.send({ msg: "failed" });
            console.log(err);
          } else {
            let base64Image = new Buffer.from(data, "binary").toString(
              "base64"
            );
            let postobj = result[0];
            Object.assign(postobj, { img: base64Image });
            res.send({ msg: postobj });
          }
        });
      }
    }
  );
});

module.exports = router;
