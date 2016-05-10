var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user.js");
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Verifies whether a user is logged in or not
router.get('/', function(req, res) {
  if(req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(false);
  }
});

// Gets a list of users (by username) for the Users page
router.get("/getusers", function(req, res) {
  User.find({}, "username", function(err, data){
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

// Gets the data for the selected user on the Users page
router.get("/getuserdata/:id", function(req, res) {
  User.findOne({ username: req.params.id }, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

router.put("/updateuser", function(req, res) {
  console.log(req.body);
  var request = req.body;
  var person = { firstname: request.firstname,
    lastname: request.lastname, email: request.email, username: request.username,
    password: request.password, admin: request.admin };
  User.findByIdAndUpdate(request._id, person, function(err, data) {
    if (err) {
      res.send(err);
    }
      res.send(data);
  });
});

// Deletes the selected user on the Users page from the database
router.post("/deleteuser", function(req, res) {
  User.remove({ username: req.body.username }, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

// Adds a user to the database via the Users page
router.post("/adduser", function (req, res) {
  var request = req.body;
  var newUser = new User({ 'firstname' : request.firstname, 'lastname' : request.lastname,
  'email' : request.email, 'username' : request.username, 'password' : request.password,
  'admin' : request.admin });
  newUser.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});


module.exports = router;
