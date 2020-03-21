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
router.get("/", function(req, res) {
  res.send("seeker controller works!");
});


<<<<<<< HEAD
=======

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


>>>>>>> origin/tre1
//  ternary user ? res.json(user): res.send ("User not found in our database");
router.delete("/delete/:id", function (req, res) {
    var primaryKey = req.params.id
    var userid = req.user.id
  
    Seeker.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return res.json(data)
    }),
        err => res.send(500, err.message)
  })
  
  //Updating record for the individual
  //Endpoint: /update/[number here]
  //Actual URL: localhost:3000/authtest/update/10
  
  router.put("/update/:id", function (req, res) {
    var userid = req.user.id
    var primaryKey = req.params.id
    var preDiskTraits = req.body.Seeker.preDiskTraits
    var prevJobs = req.body.Seeker.prevJobs
    var prefSkills = req.body.Seeker.prefSkills
    var companies = req.body.Seeker.companies

    // insert model variables
  
    Seeker.update({
        preDiskTraits: preDiskTraits,
        prevJobs: prevJobs,
        prefSkills: prefSkills,
        companies: companies
    },
        { where: { id: primaryKey, owner: userid } }
    ).then(
        data => {
            return data ? res.json(data) : res.send("Not authorized to update row")
        }),
        err => res.send(500, err.message)
  })
  
  router.get("/skills", function (req, res) {
    //grabbing all of the Grocery List items from data
    //database for a given user
    var skills = req.body.Seeker.skills
    Finder.findAll({
        where: { skills:skills }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message)
        })
})

module.exports = router;
