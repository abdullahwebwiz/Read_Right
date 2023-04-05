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

const db1 = new sqlite3.Database(dest1, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
  let whatimg = req.body.whatimg;
  let imgid = req.body.imgid;
  let imgtype = req.body.imgtype;

  let dest = path.join(
    __dirname,
    "../" +
      whatimg +
      "/tn_" +
      imgid +
      "." +
      imgtype.toString().replace("image/", "")
  );
  fs.readFile(dest, (err, data) => {
    if (err) {
      res.send({ msg: "failed" });
      console.log(err);
    } else {
      let base64Image = new Buffer.from(data, "binary").toString("base64");

      res.send({ img: base64Image });
    }
  });
});

module.exports = router;
