var express = require("express");
var router = express.Router();
var sequelize = require("../db")
var Finder = sequelize.import("../models/finder")
var Seeker = sequelize.import("../models/seeker")

router.post("/create", function(req, res) { //Tested in Postman
  // var owner = req.user.id;
  var diskRank = req.body.finder.diskrank
  var employType = req.body.finder.employtype
  var about = req.body.finder.about
  var skills = req.body.finder.skills
  var salary = req.body.finder.salary
  var projects = req.body.finder.projects

  Finder.create({
    // owner: owner,
    diskrank: diskRank,
    employtype: employType,
    about: about,
    skills: skills,
    salary: salary,
    projects: projects
  }).then (
    function createSuccess(
      // owner,
      diskrank,
      employtype,
      about,
      skills,
      salary,
      projects
    ) {
      res.json({
        // owner: owner,
        diskrank: diskrank,
        employtype: employtype,
        about: about,
        skills: skills,
        salary: salary,
        projects: projects
      })
    },
    function createError(err) {
      res.send(500, err.message)
    }
  )
})

router.get("/", function (req, res) { //Tested in Postman
  Seeker.findAll({
  }).then(
      function findAllSuccess(data) {
          res.json(data)
      }, function findAll(err) {
          res.send(500, err.message)
      })
})

router.put("/update/:id", function(req, res) { //Tested in Postman
  // var userid = req.user.id; add back this line for authorization later
  var primaryKey = req.params.id;
  var diskRank = req.body.finder.diskrank
  var employType = req.body.finder.employtype
  var about = req.body.finder.about
  var skills = req.body.finder.skills
  var salary = req.body.finder.salary
  var projects = req.body.finder.projects

// insert model variables

  Finder.update(
  {
    diskrank: diskRank,
    employtype: employType,
    about: about,
    skills: skills,
    salary: salary,
    projects: projects
  },
      { where: { id: primaryKey } } 
      // , owner: userid took out this line from above line add back for authorization
  ).then(data => {
      return data ? res.json(data) : res.send("Not authorized to update row");
  }),
  err => res.send(500, err.message);
});

router.get('/:id', function (req, res) {
  var userid = req.user.id
  Seeker.findOne({
      where: { owner: userid }
  }).then(
      data => {
          return res.json(data)
      }),
      err => res.send(500, err.message)
})
module.exports = router;
