"use strict";
// BASE SETUP
// =============================================================================
var express = require('express');           // call express
var compression = require('compression')    // express compression
var app = express();                        // define our app using express
var bodyParser = require('body-parser');    // json parser
var morgan = require('morgan');             // console logger
var fs = require('fs');                     // file system
var jwt = require('jsonwebtoken');          // used to create, sign, and verify tokens
var config = require('./config/config');    // our config file
var passport = require('passport');         // auth library
var flash    = require('connect-flash');    // needed for passport
var cookieParser = require('cookie-parser');// cookies needed for passport
var session = require('express-session');   // session support needed for passport
var port = process.env.PORT || 8082;        // set our port
var server = require('http').Server(app);   // our http server
var io = require('socket.io')(server);      // socket.io for streaming events
//var favicon = require('serve-favicon');   // change the favicon

// GLOBAL APP VARIABLES
// =============================================================================
app.set('openroutes', config.openroutes);
app.set('pagesize', config.pagesize);

// EXPRESS SETUP - web server
// =============================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));                 // use morgan to log requests to the console
app.use(cookieParser());                // read cookies (needed for auth)
app.use(compression());                 // compression = good
app.use(express.static('www'));         // setup express to server static content
app.set('views', __dirname  + '/www');  // change my default dir to www instead of views
//app.use(favicon(__dirname + '/www/assets/favicon.ico'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.disable('x-powered-by');

app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    }
);

// PASSPORT SETUP - the auth library
// =============================================================================

var configAuth;
try {
    configAuth = require('./config/authkeys.js'); 
} catch (error) {
    console.warn("WARNING>>>WARNING>>>WARNING>>>WARNING>>> NO authkeys.js");
    console.warn("You must program your own authkeys.js file. Copy ./config/authkeys-template.js and enter your keys");
    console.warn("Loading authkeys-template.js instead");
    configAuth = require('./config/authkeys-template.js');
}


require('./app/modules/passport.js')(passport, configAuth); // pass passport for configuration
app.use(session({ secret: 'ilovescotchscotchyscotchscotch', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session


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

// modules
var repo = require('./app/modules/repository.js');   
require('./app/modules/passport-routes.js')(app, passport, jwt, configAuth); // load our routes and pass in our app and fully configured passport
// controllers
require('./app/controllers/auth.js')(app, router, jwt, configAuth);
require('./app/controllers/todo.js')(app, router, io); 



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

// REGISTER OUR ROUTES
// ROUTES FOR OUR API LOCATED IN /CONTROLLERS
// =============================================================================
app.use('/api/v1', router);         // all of our routes will be prefixed with /api
// test route to make sure everything is working (accessed at GET http://localhost:8082/api/v1)
router.get('/', function (req, res) {
    res.json({ message: 'success! welcome to our api!' });
});
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


// START THE SERVER
// =============================================================================
//app.listen(port);
server.listen(port);

console.log('Magic happens on port ' + port + ' please visit http://localhost:8082 or hit http://localhost:8082/api/v1/');