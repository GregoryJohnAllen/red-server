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
  //add var = userId so it can be refrenced in line 28
  var userid ;
  var token ;

  User.create({
    fname: fname,
    lname: lname,
    email: email,
    password: bcrypt.hashSync(password, 10),
    phone: phone,
    profiletype: profiletype
  }) 
  .then (function userTable(response){
    userid = response.id
    console.log(response)
    token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24
    })
  
  if (profiletype === "finder"){
      Finder.create({
        diskrank: null,
        employtpe: null,
        about: null,
        skills: null,
        salary: null,
        projects: null,
        userid: userid
      }).then(
        function createSuccess(response) {
          res.json({
            userid: userid,
            message: "created",
            fname: fname,
            lname: lname,
            sessionToken: token,
            profileType: profiletype,
            data: response
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
          companies: null,
          userid: userid
        }).then(
          function createSuccess(response) {
            res.json({
              userid: userid,
              message: "created",
              fname: fname,
              lname: lname,
              sessionToken: token,
              profileType: profiletype,
              data: response
            });
          },
          function createError(err) {
            res.json(500, err.message);
          }
        )}
        })
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

router.get("/getall", function(req, res) {
  User.findAll().then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAll(err) {
      res.send(500, err.message);
    }
  );
})

<<<<<<< HEAD
router.get("/getmyprofile", function(req, res) {
  User.findOne({
    where: { id: req.user.id }
=======
router.get("/getmyprofile/:id", function(req, res) {
  User.findOne({
    where: { id:req.params.id }
>>>>>>> origin/marina5
  }).then(data => {
    return res.json(data);
  }),
    err => res.send(500, err.message);
});

//  ternary user ? res.json(user): res.send ("User not found in our database");

module.exports = router;
