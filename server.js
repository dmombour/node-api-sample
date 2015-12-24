"use strict";
// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express');           // call express
var compression = require('compression')    // express compression
var app = express();                        // define our app using express
var bodyParser = require('body-parser');    // json parser
var morgan = require('morgan');             // console logger
var fs = require('fs');                     // file system
var jwt = require('jsonwebtoken');          // used to create, sign, and verify tokens
var config = require('./config/config');    // our config file
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');// cookies needed for passport
var session = require('express-session');   // session support needed for passport
var port = process.env.PORT || 8082;        // set our port
//var favicon = require('serve-favicon');

// configuration variables
app.set('superSecret', config.secret); // secret variable
app.set('trustedservers', config.trustedservers);
app.set('openroutes', config.openroutes);
app.set('pagesize', config.pagesize);

// set up our express application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));     // use morgan to log requests to the console
app.use(cookieParser());    // read cookies (needed for auth)

// setup express to server static content
app.use(compression())
app.use(express.static('www'));
app.set('views', __dirname  + '/www');
//app.use(favicon(__dirname + '/www/assets/favicon.ico'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
require('./app/modules/passport.js')(passport); // pass passport for configuration
app.use(session({ secret: 'ilovescotchscotchyscotchscotch', resave: true,
    saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//Load controllers dynamically
/*
fs.readdirSync('./app/controllers').forEach(function(file) {
    var name = file.substr(0, file.indexOf('.'));
    console.log('require:' + './app/controllers/' + name);
    require('./app/controllers/' + name)(app, router);    
});*/

var repo = require('./app/modules/repository.js');                   
require('./app/controllers/authenticationController')(app, router, jwt);
require('./app/controllers/todoController')(app, router); 
require('./app/modules/passport-routes.js')(app, passport, jwt); // load our routes and pass in our app and fully configured passport


// middleware to use for all requests
router.use(function (req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

//http response helper methods
express.response.ok = function(item) {
    return this.status(200).send(item);
};
express.response.created = function(item, location) {
    this.location(location)
    return this.status(201).send(item);
};
express.response.badRequest = function(message) {
    return this.status(400).send(message);
};
express.response.notFound = function(message) {
    return this.status(404).send(message);
};
express.response.unauthorized = function(message) {
    return this.status(401).send(message);
};
express.response.forbidden = function(message) {
    return this.status(403).send(message);
};

// ROUTES FOR OUR API LOCATED IN /CONTROLLERS
// =============================================================================

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// test route to make sure everything is working (accessed at GET http://localhost:8082/api/v1)
router.get('/', function (req, res) {
    res.json({ message: 'success! welcome to our api!' });
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port + ' please visit http://localhost:8082/api/v1');