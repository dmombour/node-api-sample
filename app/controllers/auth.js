"use strict";
var _ = require('lodash');
var User = require('../models/user.js');
var repo = require('../modules/repository.js');

// Auth controller. Used to protect resources in this application and obtain a bearer token
// =========================================================================

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
                    return res.unauthorized('unauthorized. Failed to authenticate token. please login. The error was:' + err.message);
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
                return res.unauthorized('unauthorized. please login');
            }
        }
    });

    // routes
    router.route('/auth/token')

    /**
    * @api {get} /auth/token Get
    * @apiGroup Authentication
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    *{
    *  "_links": {
    *    "self": "/api/v1/auth/token"
    *  },
    *  "items": [
    *    {
    *      "_links": {
    *        "self": "/api/v1/todos/0"
    *      },
    *      "name": "item_0",
    *      "id": 0
    *    },
    *    {
    *      "_links": {
    *        "self": "/api/v1/todos/1"
    *      },
    *      "name": "item_1",
    *      "id": 1
    *    }
    *  ]
    *}
    */
        .get(function (req, res) {

            var decoded = req.decoded;
            if (decoded) {

                console.log(decoded);
                res.json(decoded);

            }
            else {
                res.unauthorized();
            }

        })

    /**
   * @api {post} /auth/token Create access token
   * @apiDescription Authenticating users is an essential element of a typical security model to confirm the identification of a user (or in some cases, a machine) that is trying to log on or access resources. 
   * 
   * There are 3 basic models used. Standard username & password identity flow used for known registered users of the system (grant_type=password). Next is used for machine to machine trust, these tokens can be used to represent a server or
   * they can be used to impersonate a user as well (grant_type=client_credentials). To impersonate or gain access to a user based token simply specify the uniqueid and optionally the user details.
   * 
   * x-www-formurlencoded
   * @apiParam {string} grant_type The type of grant. Either of these choices [password] = standard username & password flow. [client_credentials] = used for server to server connections.
   * @apiParam {string} username The username. REQUIRED with grant_type=password.
   * @apiParam {string} password The password. REQUIRED with grant_type=password.
   * @apiParam {string} client_id The client_id. REQUIRED with grant_type=client_credentials.
   * @apiParam {string} client_secret The client_secret. REQUIRED with grant_type=client_credentials.
   * @apiParam {string} uniqueid The unqiue string (Example - email address, username, phone numbers, User ID, UID etc...) from your user management or identity system. OPTIONAL with grant_type=client_credentials.
   * @apiParam {string} firstname User's first name. OPTIONAL with grant_type=client_credentials.
   * @apiParam {string} lastname User's last name. OPTIONAL with grant_type=client_credentials.
   * @apiParam {string} pictureurl URL of user's avatar or profile picture. OPTIONAL with grant_type=client_credentials.
   * @apiGroup Authentication
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "token_type": "bearer",
   *   "expires_in": 5183999,
   *   "access_token": "eyJ0eXAiOiJKV.....",
   *   "refresh_token": "none",
   *   "scope": "read write"
   * }
   */

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
                            expiresIn: 86400 // expires in 24 hours
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
                        return res.unauthorized('unauthorized. username and password does not match a user in the system.');
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
                        return res.unauthorized('unauthorized. system does not recognize this client_id and client_secret');
                    }
                    break;
                default:
                    res.status(500);
                    res.send('Unknown grant_type');
                    break;
            }
        });
}