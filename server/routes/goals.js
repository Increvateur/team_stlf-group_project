var express = require('express');
var router = express.Router();
var passport = require('passport');
var Goals = require("../models/goals.js");


router.get('/', function(req, res) {
    // check if logged in
    if(req.isAuthenticated()) {
        // send back user object from database
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

router.get("/getgoals", function(req, res){
    User.find({}, function(err, data){
        if (err) {
            console.log("Error Retrieving Names from the Database", err);
        }
        res.send(data);
    });
});

router.post("/postgoals", function (req, res) {
    var request = req.body;
    console.log(request);
    var newGoals = new Goals({ 'fiscal_year' : request.fiscalyear, 'months' : request.months });
    newGoals.save(function(err, data) {
        if (err) {
            console.log("Error Saving Names to Database", err);
        }
        res.send(data);
    });
});


module.exports = router;
