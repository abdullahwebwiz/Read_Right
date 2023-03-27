const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const app = express();

router.post("/verify", (req, res) => {
  let email = req.body.email;
  let otp = req.body.otp;
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
    subject: "OTP alert",
    text: `your otp is ${otp}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("failed 1 " + err);
    }
    console.log('success');
    res.send({ msg: "success" });
  });
});

module.exports = router;
