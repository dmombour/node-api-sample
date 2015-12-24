"use strict";
// Auth Keys - Used for social auth and server authentication
// =========================================================================

module.exports = {

    'facebookAuth': {
        'clientID': 'your-id', // your App ID
        'clientSecret': 'your-secret', // your App Secret
        'callbackURL': 'http://yourserver:8082/auth/facebook/callback'
    },
    'microsoftAuth': {
        'clientID': 'your-id', // your App ID
        'clientSecret': 'your-secret', // your App Secret
        'callbackURL': 'http://yourserver:8082/auth/microsoft/callback'
    },
    'twitterAuth': {
        'consumerKey': 'your-id',
        'consumerSecret': 'your-secret',
        'callbackURL': 'http://yourserver:8082/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': 'your-id',
        'clientSecret': 'your-secret',
        'callbackURL': 'http://yourserver:8082/auth/google/callback'
    },

    'linkedinAuth': {
        'clientID': 'your-id',
        'clientSecret': 'your-secret',
        'callbackURL': 'http://yourserver:8082/auth/linkedin/callback'
    },

    'jwtsecret': 'ilovescotchyscotch',

    'trustedservers': [
        { name: 'serverA', client_id: 'serverA', client_secret: 'secretcode' },
        { name: 'serverB', client_id: 'serverB', client_secret: 'secretcode' }],

};