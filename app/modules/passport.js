"use strict";

// 
// Passport strategies for third party identity providers
// =========================================================================

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var _ = require('lodash');
var repo = require('./repository.js'); 

// load up the user model
var User = require('../models/user.js');

module.exports = function (passport, configAuth) {
   
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {

        var user = repo.getUserById(id);
        if (user) {
            done(null, user); // user found, return that user                        
        }
        else {
            done('no user matched in repo');
        }
    });
    
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        //profileFields: ['id', 'name', 'email'],
        passReqToCallback: false, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        enableProof: true
    },
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                console.log('facebook:', profile);
                // find matching user in repo
                // first look this user up by the external ID
                var fbId = profile.id;
                var user = repo.getUserById(fbId);

                if (!user) {
                    // next try the email
                    var email = profile._json.email;
                    user = repo.getUserById(email);

                    if (user) {
                        // let's link this account
                        user.externalId = profile.id;
                        repo.updateUser(user);
                    }
                }

                if (user) {

                    if (!user.pictureurl) {
                        user.pictureurl = 'http://graph.facebook.com/' + profile.id + '/picture?type=small';
                        repo.updateUser(user);
                    }

                    return done(null, user); // user found, return that user                        
                }
                else {
                    // return done('no user matched in repo');                        
                    // create user
                    var newUser = new User();
                    newUser.id = profile.id;
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.email = profile._json.email;
                    newUser.pictureurl = 'http://graph.facebook.com/' + profile.id + '/picture?type=small';

                    repo.addUser(newUser);

                    return done(null, newUser); // user found, return that user 
                }

            });

        }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
        function (req, token, tokenSecret, profile, done) {

            // asynchronous
            process.nextTick(function () {

                console.log('twitter:', profile);
                // find matching user in repo
                // first look this user up by the external ID
                var externalId = profile.id;
                var user = repo.getUserById(externalId);

                if (!user) {
                    // twitter does NOT have email.. we need to do a fuzzy search..
                    var users = repo.getUsers();

                    var user = _.find(users, function (u) {

                        var name = u.firstName + ' ' + u.lastName;
                        return u.username == profile.username && name == profile.displayName;

                    });

                    if (user) {
                        // let's link this account
                        user.externalId = profile.id;
                        user.pictureurl = profile._json.profile_image_url_https;
                        repo.updateUser(user);
                    }
                }

                if (user) {

                    if (!user.pictureurl) {
                        user.pictureurl = profile._json.profile_image_url_https;
                        repo.updateUser(user);
                    }

                    return done(null, user); // user found, return that user                        
                }
                else {
                    // return done('no user matched in repo');                        
                    // create user
                    var newUser = new User();
                    newUser.id = profile.id;
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.pictureurl = profile._json.profile_image_url_https;

                    repo.addUser(newUser);

                    return done(null, newUser); // user found, return that user 
                }
            });

        }));

    // =========================================================================
    // LINKEDIN ==================================================================
    // =========================================================================
    passport.use(new LinkedInStrategy({
        clientID: configAuth.linkedinAuth.clientID,
        clientSecret: configAuth.linkedinAuth.clientSecret,
        callbackURL: configAuth.linkedinAuth.callbackURL,
        scope: ['r_emailaddress', 'r_basicprofile'],
        state: true,
    },
        function (token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                console.log('linkedin:', profile);
                // find matching user in repo
                // first look this user up by the external ID
                var externalid = profile.id;
                var user = repo.getUserById(externalid);

                if (!user) {
                    // next try the email
                    var email = profile._json.emailAddress;
                    user = repo.getUserById(email);

                    if (user) {
                        // let's link this account
                        user.externalId = profile.id;
                        repo.updateUser(user);
                    }
                }

                if (user) {

                    if (!user.pictureurl) {
                        user.pictureurl = profile._json.pictureUrl;
                        repo.updateUser(user);
                    }

                    return done(null, user); // user found, return that user                        
                }
                else {
                    // return done('no user matched in repo');                        
                    // create user
                    var newUser = new User();
                    newUser.id = profile.id;
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.email = profile._json.emailAddress;
                    newUser.pictureurl = profile._json.pictureUrl;

                    repo.addUser(newUser);

                    return done(null, newUser); // user found, return that user 
                }

            });
        }
        ));



    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                console.log('google:', profile);
                // find matching user in repo
                // first look this user up by the external ID
                var externalid = profile.id;
                var user = repo.getUserById(externalid);

                if (!user) {
                    // next try the email
                    var email = profile.emails[0].value;
                    user = repo.getUserById(email);

                    if (user) {
                        // let's link this account
                        user.externalId = profile.id;
                        repo.updateUser(user);
                    }
                }

                if (user) {

                    if (!user.pictureurl) {
                        user.pictureurl = profile._json.image.url;
                        repo.updateUser(user);
                    }

                    return done(null, user); // user found, return that user                        
                }
                else {
                    // return done('no user matched in repo');                        
                    // create user
                    var newUser = new User();
                    newUser.id = profile.id;
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.email = profile.emails[0].value;
                    newUser.pictureurl = profile._json.image.url;

                    repo.addUser(newUser);

                    return done(null, newUser); // user found, return that user 
                }


            });

        }));

};
