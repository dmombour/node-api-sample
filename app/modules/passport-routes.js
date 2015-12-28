"use strict";
module.exports = function (app, passport, jwt, configAuth) {

    var superSecret = configAuth.jwtsecret;
    
    // normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('index.ejs', { message: req.flash('loginMessage') });
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function (req, res) {
        res.render('index.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


     // linkedin -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/linkedin', passport.authenticate('linkedin', { session: false, scope: ['r_emailaddress', 'r_basicprofile'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', { session: false, failureRedirect: '/login', state: 'SOME STATE' }),
    
        // on succes
        function (req, res) {
            // return the token or you would wish otherwise give eg. a succes message
            //res.render('json', { data: JSON.stringify(req.user.access_token) });
            // ok. we have our user. we need to create a jwt token and pass via query string.
            var token = jwt.sign(req.user, superSecret, {
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
                res.status(400);
                res.render('error', { message: err.message });
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
            var token = jwt.sign(req.user, superSecret, {
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
                res.status(400);
                res.render('error', { message: err.message });
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
            var token = jwt.sign(req.user, superSecret, {
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
                res.status(400);
                res.render('error', { message: err.message });
            }
        });
        
    /* app.get('/auth/twitter/callback',
         passport.authenticate('twitter', {
             successRedirect: '/profile',
             failureRedirect: '/'
         }));*/


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
            var token = jwt.sign(req.user, superSecret, {
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
                res.status(400);
                res.render('error', { message: err.message });
            }
        });


    // the callback after google has authenticated the user
    /*    app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/profile',
                failureRedirect: '/'
            }));*/

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function (req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function (req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function (req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function (req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
