"use strict";

// 
// Passport routes for third party identity providers
// =========================================================================

var Token = require('../models/token.js');

module.exports = function (app, passport, jwt, configAuth) {

    var superSecret = configAuth.jwtsecret;
    
     // linkedin -------------------------------

    // send to linkedin to do the authentication
    app.get('/auth/linkedin', passport.authenticate('linkedin', { session: false, scope: ['r_emailaddress', 'r_basicprofile'] }));

    // handle the callback after linkedin has authenticated the user
    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', { session: false, failureRedirect: '/login', state: 'SOME STATE' }),
    
        // on succes
        function (req, res) {
            // return the token or you would wish otherwise give eg. a succes message
            //res.render('json', { data: JSON.stringify(req.user.access_token) });
            // ok. we have our user. we need to create a jwt token and pass via query string.
            var user = req.user;
            var userToken = new Token(user.id, user.firstName + ' ' + user.lastName, 'User', user.email, 'Facebook');
            var token = jwt.sign(userToken, superSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.redirect('/#/login/' + token);
        },
    
        // on error; likely to be something token invalid or already used token,
        // these errors occur when the user logs in twice with the same token
        function (err, req, res, next) {
            // You could put your own behavior in here, fx: you could force auth again...
            // res.redirect('/auth/linkedin/');
            if (err) {
                res.redirect('/#/login?message=' + err.message);
            }
        });


    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { session: false, scope: ['email', 'user_birthday', 'user_location'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
    
        // on succes
        function (req, res) {
            // return the token or you would wish otherwise give eg. a succes message
            //res.render('json', { data: JSON.stringify(req.user.access_token) });
            // ok. we have our user. we need to create a jwt token and pass via query string.
            var user = req.user;
            var userToken = new Token(user.id, user.firstName + ' ' + user.lastName, 'User', user.email, 'Facebook');
            var token = jwt.sign(userToken, superSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.redirect('/#/login/' + token);
        },
    
        // on error; likely to be something FacebookTokenError token invalid or already used token,
        // these errors occur when the user logs in twice with the same token
        function (err, req, res, next) {
            // You could put your own behavior in here, fx: you could force auth again...
            // res.redirect('/auth/facebook/');
            if (err) {
                res.redirect('/#/login?message=' + err.message);
            }
        });

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', { scope: [''] }));

    // handle the callback after twitter has authenticated the user
    // handle the callback after facebook has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { session: false, failureRedirect: '/login' }),
    
        // on succes
        function (req, res) {
            // return the token or you would wish otherwise give eg. a succes message
            //res.render('json', { data: JSON.stringify(req.user.access_token) });
            // ok. we have our user. we need to create a jwt token and pass via query string.
             var user = req.user;
            var userToken = new Token(user.id, user.firstName + ' ' + user.lastName, 'User', user.email, 'Facebook');
            var token = jwt.sign(userToken, superSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.redirect('/#/login/' + token);
        },
    
        // on error; likely to be something provider token invalid or already used token,
        // these errors occur when the user logs in twice with the same token
        function (err, req, res, next) {
            // You could put your own behavior in here, fx: you could force auth again...
            // res.redirect('/auth/twitter/');
            if (err) {
                res.redirect('/#/login?message=' + err.message);
            }
        });
        
    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // handle the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    
        // on succes
        function (req, res) {
            // return the token or you would wish otherwise give eg. a succes message
            //res.render('json', { data: JSON.stringify(req.user.access_token) });
            // ok. we have our user. we need to create a jwt token and pass via query string.
           var user = req.user;
            var userToken = new Token(user.id, user.firstName + ' ' + user.lastName, 'User', user.email, 'Facebook');
            var token = jwt.sign(userToken, superSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.redirect('/#/login/' + token);
        },
    
        // on error; likely to be something FacebookTokenError token invalid or already used token,
        // these errors occur when the user logs in twice with the same token
        function (err, req, res, next) {
            // You could put your own behavior in here, fx: you could force auth again...
            // res.redirect('/auth/google/');
            if (err) {
                res.redirect('/#/login?message=' + err.message);
            }
        });
};

// route middleware to ensure user is logged in
/*function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}*/
