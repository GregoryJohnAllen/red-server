var express = require("express");
var router = express.Router();
var sequelize = require("../db")
var Finder = sequelize.import("../models/finder")
var Seeker = sequelize.import("../models/seeker")


//Controller get, post, delete go below
//the below get is a test
router.get("/", function(req, res) {
  res.send("finder controller works!");
});

router.delete("/delete/:id", function (req, res) {
  var primaryKey = req.params.id
  var userid = req.user.id

  Finder.destroy({
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
  var diskRank = req.body.Seeker.diskRank
  var employType = req.body.Seeker.employType
  var about = req.body.Seeker.about
  var skills = req.body.Seeker.skills
  var salary = req.body.Seeker.salary
  var projects = req.body.Seeker.projects

  Finder.update({
    diskRank: diskRank,
    employType: employType,
    about: about,
    skills: skills,
    salary:salary,
    projects:projects
  },
      { where: { id: primaryKey, owner: userid } }
  ).then(
      data => {
          return data ? res.json(data) : res.send("Not authorized to update row")
      }),
      err => res.send(500, err.message)
})

router.get("/pref-skills", function (req, res) {
    //grabbing all of the Grocery List items from data
    //database for a given user
    var prefSkills = req.body.Seeker.prefSkills
    Seeker.findAll({
        where: { prefSkills:prefSkills }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message)
        })
})

module.exports = router;
