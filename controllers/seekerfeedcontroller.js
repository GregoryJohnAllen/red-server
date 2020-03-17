var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user');
var SeekerFeedModel = sequelize.import('../models/seekerfeed')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')


router.get("/getall", function (req, res) {
    //grabbing all of the items from data
    //database for a given user
    var userid = req.user.id
    SeekerFeedModel.findAll({
        where: { owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message)
        })
})

//posting data for given user
router.post("/create", function (req, res) {
    // insert model variables

    SeekerFeedModel.create({
        // insert model
        owner: owner
    }).then(
        function createSuccess(concept, definition, example) {
            res.json({
                // insert model
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

//localhost:4000/[Primary Key Number]
//localhost:4000/authtest/6
router.get("/:id", function (req, res) {
    var primaryKey = req.params.id
    var userid = req.user.id
    SeekerFeedModel.findOne({
        where: {
            id: primaryKey,
            owner: userid
        }
    }).then(
        data => {
            return data 
            ? res.json(data) 
            : res.send("Not authorized to view row")
        }),
        err => res.send(500, err.message)
})

router.delete("/delete/:id", function (req, res) {
    var primaryKey = req.params.id
    var userid = req.user.id

    SeekerFeedModel.destroy({
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
    // insert model variables

    SeekerFeedModel.update({
        // insert model
    },
        { where: { id: primaryKey, owner: userid } }
    ).then(
        data => {
            return data ? res.json(data) : res.send("Not authorized to update row")
        }),
        err => res.send(500, err.message)
})

// router.get("/getallimages", function (req, res) {
//     //grabbing all of the Grocery List items from data
//     //database for a given user
//     var userid = req.user.id
//     CardModel.findAll({
//         where: { owner: userid }
//     }).then(
//         function findAllSuccess(data) {
//             res.json(data)
//         }, function findAll(err) {
//             res.send(500, err.message)
//         })
// })

module.exports = router