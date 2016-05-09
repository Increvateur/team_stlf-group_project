var express = require('express');
var router = express.Router();
var passport = require('passport');
var Goals = require("../models/goals.js");



// GET call to retrieve the Goals from DB
router.get("/getgoals", function(req, res){
    Goals.find({}, function(err, data){
        if (err) {
            console.log("Error Retrieving Names from the Database", err);
        }
        console.log('@SERVER - getgoals, response data: ', data);
        res.send(data);
    });
});

// GET to find specific year so Admin can update
router.get('/:year', function(req, res){
  console.log('^^^ @SERVER - log req.params', req.params);
  Goals.findOne({fiscal_year: req.params.year}, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});


// POST to add goals to the DB
router.post("/postgoals", function (req, res) {
    var request = req.body;
    console.log('@SERVER - post newGoals - request.body', request);
    var newGoals = new Goals({ 'fiscal_year' : request.fiscal_year, 'months' : request.months,
    'yearly_totals' : request.yearly_totals });
    newGoals.save(function(err, data) {
        if (err) {
            console.log("Error Saving Names to Database", err);
        }
        res.send(data);
    });
});

// GET to pull years in
router.get("/getYear/", function(req, res){
    Goals.find({'fiscal_year': year}, function(err, data){
        if (err) {
            console.log("Error Retrieving Names from the Database", err);
        }
        console.log('@SERVER - getgoals, response data: ', data);
        res.send(data);
    });
});

router.put('/:year', function(req, res) {
  console.log('@SERVER - PUT for updating goals - req.params: ', req.params);

  // Goals.findOne({fiscal_year: req.params.year}, function(err, data) {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.send(data);
  // });
});



module.exports = router;
