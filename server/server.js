var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require('./strategies/user');

//Database - MongoDb
var db = require("./modules/db_connect.js");

// Routes
var user = require('./routes/user');
var index = require('./routes/index.js');
var goals = require('./routes/goals');
var salesforce = require('./routes/salesforce.js');
var dateutils = require("date-utils");

// Port //
var port = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 1800000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

// routes and server connection

app.use('/salesforce', salesforce);
app.use("/user", user);
app.use('/goals', goals);
app.use("/", index);

// server //
var server = app.listen(port,function(){
   var port = server.address().port;
   console.log('now open on port',port);

});

module.exports = app;
