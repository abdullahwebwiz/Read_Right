const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
let dest = path.join(__dirname, "../databases/database1.db");
const db = new sqlite3.Database(dest, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log("failed database " + err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/forgotpassword", (req, res) => {
  let email = req.body.email;

  db.all(
    `SELECT password FROM users WHERE  email  = "${email}"`,
    (err, result, f) => {
      if (err) {
        res.send({ msg: "failed" });
        console.log("failed inserting." + err);
      } else {
        if (result != "") {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "mailmohammadabdullah@gmail.com",
              pass: "euosudopgvcaetay",
            },
          });

          const mailOptions = {
            from: "mailmohammadabdullah@gmail.com",
            to: email,
            subject: "your Forgot your password.",
            text: `Delete this email immediately.
                  your password is ${result[0].password}`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log("failed 1 " + err);
              res.send({ msg: "failed" });
            }
            res.send({ msg: "success" });
          });
        } else {
          res.send({ msg: "noaccount" });
        }
      }
    }
  );
});

module.exports = router;
