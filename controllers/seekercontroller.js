var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Seeker = sequelize.import("../models/seeker");
var Finder = sequelize.import("../models/finder");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//CREATE SEEKER
router.post("/create", function(req, res) {
    var preDiskTraits = req.body.seeker.predisktraits
    var prevJobs = req.body.seeker.prevjobs
    var prefSkills = req.body.seeker.prefskills
    var companies = req.body.seeker.companies

    Seeker.create({
        predisktraits: preDiskTraits,
        prevjobs: prevJobs,
        prefskills: prefSkills,
        companies: companies
    }).then(
    function createSuccess(
      // owner,
        predisktraits,
        prevjobs,
        prefskills,
        companies
    ) {
        res.json({
        // owner: owner,
        predisktraits: predisktraits,
        prevjobs: prevjobs,
        prefskills: prefskills,
        companies: companies
        });
    },
    function createError(err) {
        res.send(500, err.message);
    }
    );
});

//GET ALL
router.get("/", function(req, res) { //Tested in Postman
    Finder.findAll().then(
        function findAllSuccess(data) {
        res.json(data);
    },
    function findAll(err) {
        res.send(500, err.message);
    }
    );
});

//GET BY ID
router.get("/:id", function(req, res) {
  Finder.findOne({
    where: { id: req.params.id }
  }).then(data => {
    return res.json(data);
  }),
    err => res.send(500, err.message);
});

router.delete("/delete/:id", function(req, res) {
    var primaryKey = req.params.id;
    var userid = req.user.id;

    Seeker.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return res.json(data);
    }),
    err => res.send(500, err.message);
});

router.put("/update/:id", function(req, res) {
    // var userid = req.user.id; add back this line for authorization later
    var primaryKey = req.params.id;
    var preDiskTraits = req.body.seeker.predisktraits;
    var prevJobs = req.body.seeker.prevjobs;
    var prefSkills = req.body.seeker.prefskills;
    var companies = req.body.seeker.companies;

  // insert model variables

    Seeker.update(
    {
        predisktraits: preDiskTraits,
        prevjobs: prevJobs,
        prefskills: prefSkills,
        companies: companies
    },
        { where: { id: primaryKey } } 
        // , owner: userid took out this lube from above line add back for authorization
    ).then(data => {
        return data ? res.json(data) : res.send("Not authorized to update row");
    }),
    err => res.send(500, err.message);
});

router.get("/skills", function(req, res) {
  //grabbing all of the Grocery List items from data
  //database for a given user
  var skills = req.body.Seeker.skills;
  Finder.findAll({
    where: { skills: skills }
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAll(err) {
      res.send(500, err.message);
    }
  );
});

module.exports = router;
