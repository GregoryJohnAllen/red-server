var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Seeker = sequelize.import("../models/seeker");
var Finder = sequelize.import("../models/finder");
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


//CREATE SEEKER
router.post("/create", upload.single("file"),function(req, res) {
    var predisktraits = req.body.seeker.predisktraits
    var prevjobs = req.body.seeker.prevjobs
    var prefskills = req.body.seeker.prefskills
    var companies = req.body.seeker.companies
    let file=req.file


    Seeker.create({
        predisktraits: predisktraits,
        prevjobs: prevjobs,
        prefskills: prefskills,
        companies: companies,
        photourl:file.filename
    }).then(
    function createSuccess(
      // owner,
        predisktraits,
        prevjobs,
        prefskills,
        companies,
        file
    ) {
        res.json({
        // owner: owner,
        predisktraits: predisktraits,
        prevjobs: prevjobs,
        prefskills: prefskills,
        companies: companies,
        photourl:file.filename
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
    where: { owner: userid }
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
    var predisktraits = req.body.seeker.predisktraits;
    var prevjobs = req.body.seeker.prevjobs;
    var prefskills = req.body.seeker.prefskills;
    var companies = req.body.seeker.companies;
    let file=req.file


  // insert model variables

    Seeker.update(
    {
        predisktraits: predisktraits,
        prevjobs: prevjobs,
        prefskills: prefskills,
        companies: companies,
        photourl:file.filename
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
