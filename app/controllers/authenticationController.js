"use strict";
/// <reference path="../../server.js"/>
/// <reference path="../models/user.js"/>
var _ = require('lodash');
var User = require('../models/user.js');
var repo = require('../modules/repository.js'); 

module.exports = function (app, router, jwt) {

    // route middleware to verify a token and ALLOW or DENY an http request 
    router.use(function (req, res, next) {
    
        // check header or url parameters or post parameters for token        
        var token = req.query.token || req.headers['authorization'];        
        // decode token
        if (token) {

            token = token.replace("Bearer ", "");
        
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token... is this an insecure URL?
            var openroutes = app.get('openroutes');
            var reqUrl = req.url;
            console.log('auth:route', reqUrl);  
            
            //search for open insecure routes
            var match = _.find(openroutes, function (url) {
                return (reqUrl.toString().indexOf(url.toString()) != -1);
            });

            if (match) {
                console.log('auth:insecure route match. ALLOWED', match);
                next();

            }
            else {
                console.log('auth:insecure route match. DENIED');
                // return an error
                return res.status(403).send('Unauthorized');
            }
        }
    });

    router.route('/token')

        .get(function (req, res) {

            // return the decoded token if it exists
            var decoded = req.decoded;
            if (decoded) {

                console.log(decoded);
                res.json(decoded);

            }
            else {

                res.json({ message: 'unknown' });
            }

        })

        .post(function (req, res) {

            var trustedservers = app.get('trustedservers');

            switch (req.body.grant_type) {
                case 'password':

                    var uname = req.body.username;
                    var password = req.body.password;

                    console.log('auth:password flow for ' + uname);

                    // find matching user
                    var match = repo.getUserById(uname);
                    if (match) {
                        if (match.password.trim() != password) {
                            console.log('auth:password dont match');
                            match = null;
                        }
                    }

                    if (match != undefined) {
                        console.log('auth:password flow... found', match);      
                        // create a token
                        var token = jwt.sign(match, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });    
                        
                        // return the information including token as JSON
                        res.json({
                            token_type: 'bearer',
                            expires_in: 5183999,
                            access_token: token,
                            refresh_token: "none",
                            scope: "read write",
                        });

                    }
                    else {
                        res.status(401);
                        res.send('Unauthorized');
                    }

                    break;
                case 'client_credentials':

                    console.log('auth:client_credentials flow');

                    var client_id = req.body.client_id;
                    var client_secret = req.body.client_secret;
                    var token = '';

                    console.log('auth:client_credentials flow | client_id:' + client_id);
                    
                    //search for trusted servers
                    var match = _.find(trustedservers, function (server) {
                        return server.client_id == client_id && server.client_secret == client_secret;
                    });

                    if (match != undefined) {

                        console.log('auth:client_credentials flow | found:', match);                              
                       
                        // In this flow there is the potential for this to actually be an impersonation context. 
                        // Check to see if we want to impersonate users.. and if so then do it.                            
                        if (req.body.email != undefined) {

                            console.log('auth:client_credentials flow... email specified. searching for user:', req.body.email);   
                            
                            //find the user by email
                             var user = repo.getUserById(uname);                  
                             if (user != undefined) {

                                console.log('auth:client_credentials flow. user found', user); 
                                
                                //found the user... let's use this.
                                token = jwt.sign(user, app.get('superSecret'), {
                                    expiresInMinutes: 1440 // expires in 24 hours                                    
                                });
                            }
                            else {                                

                                //no user found... lets create one
                                console.log('auth:client_credentials flow. NO user found. Create one');
                                var newUser = User;
                                newUser.firstName = req.body.firstName;
                                newUser.lastName = req.body.lastName;
                                newUser.email = req.body.email;

                                console.log('auth:client_credentials flow. no user found. created', newUser);

                                token = jwt.sign(newUser, app.get('superSecret'), {
                                    expiresInMinutes: 1440 // expires in 24 hours                                    
                                });
                            }
                        }
                        else {
                            
                            // here ... we are not a user.. we are just a server. 
                            // give out a server token                        
                            token = jwt.sign(match, app.get('superSecret'), {
                                expiresInMinutes: 1440 // expires in 24 hours                                    
                            });
                        }                           
                            
                        // return the information including token as JSON
                        res.json({
                            token_type: 'bearer',
                            expires_in: 5183999,
                            access_token: token,
                            refresh_token: "none",
                            scope: "read write",
                        });

                    }
                    else {
                        res.status(401);
                        res.send('Unauthorized');
                    }
                    break;
                default:
                    res.status(500);
                    res.send('Unknown grant_type');
                    break;
            }
            
        });

}