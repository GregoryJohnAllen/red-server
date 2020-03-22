var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//Controller get, post, delete go below
//the below get is a test
// router.get("/", function(req, res) {
//   res.send("user controller works!");
// });

//example of user sign up with creating an entry
// router.post("/usertest", function(req, res) {
//   var testUser = req.body.user.username;
//   var pass = req.body.user.password;
//   var phone = req.body.user.phonenumber;

//   //need to use bcrypt.compare() for signin

//   User.create({
//     username: testUser,
//     password: bcrypt.hashSync(pass, 10),
//     phonenumber: phone
//   }).then(
//     function createSuccess(testUser) {
//       var token = jwt.sign({ id: testUser.id }, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24
//       });
//       res.json({
//         username: testUser,
//         message: "user created",
//         sessionToken: token
//       });
//     },
//     function createError(err) {
//       res.json(500, err.message);
//     }
//   );
// });

//create a user endpoint
router.post("/createuser", function(req, res) {
  var fname = req.body.user.fname;
  var lname = req.body.user.lname;
  var password = req.body.user.password;
  var phone = req.body.user.phone;
  var email = req.body.user.email;

  User.create({
    //this is creating a save in the database
    fname: fname,
    lname: lname,
    email: email,
    password: bcrypt.hashSync(password, 10),
    phone: phone
  }).then(
      //res.send('user was created!!!'))
      function createSuccess(email) {
          var token = jwt.sign({ id: email.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
          //process.env.JWT_SECRET this is going to allow variables for your server
          res.json({
              user: email,
              message: 'created',
              fname: fname,
              lname: lname,
              sessionToken: token
          })
      }, function createError(err) {
          res.send(500, err.message);
      })
})

//logging in a user

router.post("/login", function(req, res) {
  let user = req.body.user.email;
  let password = req.body.user.password;

  User.findOne({
    where: { email: user }
  }).then(user => {
    if (user) {
      comparePasswords(user);
    } else {
      res.send("User not found in our database");
    }
    function comparePasswords(user) {
      bcrypt.compare(password, user.password, function matches(err, matches) {
        matches ? generateToken(user) : res.send("Incorrect password");
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
