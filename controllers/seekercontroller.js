var express = require("express");
var router = express.Router();
var sequelize = require("../db")
var Seeker = sequelize.import("../models/seeker")

//Controller get, post, delete go below
//the below get is a test
router.get("/", function(req, res) {
  res.send("seeker controller works!");
});

module.exports = router;
