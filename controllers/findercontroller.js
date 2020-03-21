var express = require("express");
var router = express.Router();
var sequelize = require("../db")
var Finder = sequelize.import("../models/finder")
var Seeker = sequelize.import("../models/seeker")
var SeekerModel = sequelize.import('../models/seeker')

//Controller get, post, delete go below
//the below get is a test
router.get("/testget", function(req, res) {
  res.send("finder controller works!");
});


router.get("/", function (req, res) {
  //grabbing all of the Grocery List items from data
  var userid = req.user
  SeekerModel.findAll({
      where: { }
  }).then(
      function findAllSuccess(data) {
          res.json(data)
      }, function findAll(err) {
          res.send(500, err.message)
      })
})

router.get('/:id', function (req, res) {
  var userid = req.user.id
  SeekerModel.findOne({
      where: { owner: userid }
  }).then(
      data => {
          return res.json(data)
      }),
      err => res.send(500, err.message)
})
module.exports = router;
