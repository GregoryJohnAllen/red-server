var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

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
  
  //need to use bcrypt.compare() for signin 

  User.create({
    username: testUser,
    password: bcrypt.hashSync(pass, 10),
    phonenumber: phone
  }).then(
    function createSuccess(testUser) {
      var token = jwt.sign({ id: testUser.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      res.json({
        username: testUser,
        message: "user created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.json(500, err.message);
    }
  );
});

module.exports = router;
