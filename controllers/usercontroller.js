var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var Finder = sequelize.import("../models/finder");
var Seeker = sequelize.import("../models/seeker");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");


//create a user endpoint
router.post("/createuser", function(req, res) {
  var fname = req.body.user.fname;
  var lname = req.body.user.lname;
  var password = req.body.user.password;
  var phone = req.body.user.phone;
  var email = req.body.user.email;
  var profiletype = req.body.user.profiletype;

  User.create({
    fname: fname,
    lname: lname,
    email: email,
    password: bcrypt.hashSync(password, 10),
    phone: phone,
    profiletype: profiletype
  });
  if (profiletype === "finder"){
      Finder.create({
        diskrank: null,
        employtpe: null,
        about: null,
        skills: null,
        salary: null,
        projects: null
        //add column for req.user.id for refrence to what user actually owns that profile
      }).then(
        function createSuccess(email) {
          var token = jwt.sign({ id: email.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
          res.json({
            email: email,
            message: "created",
            fname: fname,
            lname: lname,
            sessionToken: token,
            profileType: profiletype
          });
        },
        function createError(err) {
          res.json(500, err.message);
        }
      )}
      else if (profiletype === 'seeker'){
        Seeker.create({
          predisktraits: null,
          prevjobs: null,
          prefskills: null,
          companies: null
        }).then(
          function createSuccess(email) {
            var token = jwt.sign({ id: email.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              email: email,
              message: "created",
              fname: fname,
              lname: lname,
              sessionToken: token
            });
          },
          function createError(err) {
            res.json(500, err.message);
          }
        )}
    
});

//logging in a user

router.post("/login", function(req, res) {
  User.findOne({
    where: { email: req.body.user.email }
  }).then(email => {
    if (email) {
      comparePasswords(email);
    } else {
      res.send("User not found in our database");
    }
    function comparePasswords(email) {
      bcrypt.compare(req.body.user.password, email.password, function matches(
        err,
        matches
      ) {
        matches ? generateToken(email) : res.send("Incorrect password");
      });
    }
    //may need to change user.password to user.passwordhash, not sure
    //which to put here, match code with Create in Sign Up
    function generateToken(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      //process.env.JWT_SECRET this is going to allow variables for your server
      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    }
  });
});

//  ternary user ? res.json(user): res.send ("User not found in our database");

module.exports = router;
