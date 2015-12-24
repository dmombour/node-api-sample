"use strict";
// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '387771258026865', // your App ID
        'clientSecret'  : '049ec5d08108994008209057b2ef5be1', // your App Secret
        'callbackURL'   : 'http://darrenx1.com:8082/auth/facebook/callback'
    },
    'microsoftAuth' : {
        'clientID'      : '0000000044144322', // your App ID
        'clientSecret'  : 'QekuuTgYLdBxc07yeLLG03igSLfa2KHy', // your App Secret
        'callbackURL'   : 'http://darrenx1.com:8082/auth/microsoft/callback'
    },
    'twitterAuth' : {
        'consumerKey'       : 'kHtIf7TWOVmP0wHiKgAw',
        'consumerSecret'    : 'yPKKuK4y56wh3mqGkYWgtRnCmp1vdnEsrJvAGwZ2M',
        'callbackURL'       : 'http://darrenx1.com:8082/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '595520534056-kvlu7nef7kdgd59r8du70v9ggqgotm11.apps.googleusercontent.com',
        'clientSecret'  : '_V9rMdPfrlsngIRqzBPOyflt',
        'callbackURL'   : 'http://darrenx1.com:8082/auth/google/callback'
    },

    'linkedinAuth' : {
        'clientID'      : '77tasmqu8xprjb',
        'clientSecret'  : 'AdXJjPDuIRrNaLo9',
        'callbackURL'   : 'http://darrenx1.com:8082/auth/linkedin/callback'
    }

};