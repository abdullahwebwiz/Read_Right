const express = require("express");
const app = express();
const router = express.Router();
const csc = require("country-state-city");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/country", (req, res) => {
  console.log("country reached");
  res.send(csc.Country.getAllCountries());
});

router.post("/city", (req, res) => {
  console.log("city reached");
  let country = req.body.country;
  console.log(req.body.country);
  res.send(csc.City.getCitiesOfCountry(country));
  console.log(csc.City.getCitiesOfCountry(country));
});

module.exports = router;
