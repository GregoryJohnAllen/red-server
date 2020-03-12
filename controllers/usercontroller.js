var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");

//Controller get, post, delete go below
//the below get is a test
router.get("/", function(req, res) {
  res.send("user controller works!");
});

//example of user sign up with creating an entry
router.post("/usertest", function(req, res) {
  var testUser = req.body.user.username;
  var pass = req.body.user.password;
  var phone = req.body.user.phonenumber;

  User.create({
    username: testUser,
    password: pass,
    phonenumber: phone
  }).then(function createSuccess(user) {
    res.json({
      username: testUser,
      password: pass,
      phonenumber: phone
    },
    function createError(err){
      res.send(500, err.message)
    });
  });
});
module.exports = router;
