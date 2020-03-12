var express = require("express");
var router = express.Router();
var sequelize = require("../db")
var Finder = sequelize.import("../models/finder")

//Controller get, post, delete go below
//the below get is a test
router.get("/", function(req, res) {
  res.send("finder controller works!");
});

module.exports = router;
