var express = require("express");
var router = express.Router();
var sequelize = require("../db")
var Finder = sequelize.import("../models/finder")
var Seeker = sequelize.import("../models/seeker")
var multer =  require ("multer")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `FS${Date.now()}${file.originalname.replace(/\s/g, '')}`)
  }
})
var upload = multer({ storage: storage })


router.post("/create", upload.single("file"), function(req, res) { //Tested in Postman
  // var owner = req.user.id;
  var diskrank = req.body.finder.diskrank
  var employtype = req.body.finder.employtype
  var about = req.body.finder.about
  var skills = req.body.finder.skills
  var salary = req.body.finder.salary
  var projects = req.body.finder.projects
  let file=req.file

  Finder.create({
    // owner: owner,
    diskrank: diskrank,
    employtype: employtype,
    about: about,
    skills: skills,
    salary: salary,
    projects: projects,
    photourl:file.filename
  }).then (
    function createSuccess(
      // owner,
      diskrank,
      employtype,
      about,
      skills,
      salary,
      projects,
      file
    ) {
      res.json({
        // owner: owner,
        diskrank: diskrank,
        employtype: employtype,
        about: about,
        skills: skills,
        salary: salary,
        projects: projects,
        photourl:file.filename
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
  var diskrank = req.body.finder.diskrank
  var employtype = req.body.finder.employtype
  var about = req.body.finder.about
  var skills = req.body.finder.skills
  var salary = req.body.finder.salary
  var projects = req.body.finder.projects
  let file=req.file


// insert model variables

  Finder.update(
  {
    diskrank: diskrank,
    employtype: employtype,
    about: about,
    skills: skills,
    salary: salary,
    projects: projects,
    photourl:file.filename
  },
      { where: { id: primaryKey } } 
      // , owner: userid took out this line from above line add back for authorization
  ).then(data => {
      return data ? res.json(data) : res.send("Not authorized to update row");
  }),
  err => res.send(500, err.message);
});

router.get('/:id', function (req, res) {
  Seeker.findOne({
      where: { id: req.params.id }
  }).then(
      data => {
          return res.json(data)
      }),
      err => res.send(500, err.message)
})



module.exports = router;
