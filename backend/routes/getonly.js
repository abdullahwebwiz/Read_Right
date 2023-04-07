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
  db1.all(
    `SELECT * FROM righters WHERE righterid = '${righterid}'`,
    (err, result) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log(err);
      } else {
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
    }
  );
});

router.post("/getposts", (req, res) => {
  let righterid = req.body.righterid;
  let postfilter = req.body.postfilter;
  console.log(righterid);

  let recent = `ORDER BY epoch DESC`;
  let popular = `ORDER BY reads DESC`;
  
  db1.all(
    `SELECT * FROM postrecords WHERE righterid = '${righterid}' ${
      postfilter == "Recent" ? recent : popular
    }`,
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

module.exports = router;
