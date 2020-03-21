var express = require("express");
var router = express.Router();
var sequelize = require("../db")
var Seeker = sequelize.import("../models/seeker")
var Finder = sequelize.import ("../models/finder")
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var FinderModel = sequelize.import('../models/finder')

//Controller get, post, delete go below
//the below get is a test
// router.get("/", function(req, res) {
//   res.send("seeker controller works!");
// });

//logging in a user that is a seeker

router.post('/', function (req, res) {
  let userSeeker = req.body.user.username
  let password = req.body.user.password

  User.findOne({
      where: { usernameSeeker: userSeeker }
  }).then(user => {
      if (user) {
          comparePasswords(user);
      } else {
          res.send("User not found in our database!");
      }
      function comparePasswords(user) {
          bcrypt.compare(password, user.passwordhash, function matches(err, matches) {
              matches ? generateToken(user) : res.send("Incorrect password")
          })
      }
      function generateToken(user) {
          var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
          //process.env.JWT_SECRET this is going to allow variables for your server
          res.json({
              user: user,
              message: 'created',
              sessionToken: token
          })
      }

  }
  );
});



router.get("/", function (req, res) {
    //grabbing all of the Grocery List items from data
    var userid = req.user
    FinderModel.findAll({
        where: { }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message)
        })
})

//Get All
router.get('/:id', function (req, res) {
    var userid = req.user.id
    FinderModel.findOne({
        where: { owner: userid }
    }).then(
        data => {
            return res.json(data)
        }),
        err => res.send(500, err.message)
})


//  ternary user ? res.json(user): res.send ("User not found in our database");


module.exports = router;
