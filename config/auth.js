"use strict";
// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '369500033250382', // your App ID
        'clientSecret'  : '4a3ca28934ab34509f55fb83d84941f5', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },
    'microsoftAuth' : {
        'clientID'      : '0000000044144322', // your App ID
        'clientSecret'  : 'QekuuTgYLdBxc07yeLLG03igSLfa2KHy', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/microsoft/callback'
    },
    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '595520534056-r650gtkcak14kc92i8fus4tb0rp7dj7e.apps.googleusercontent.com',
        'clientSecret'  : 'your-1KLQJXyvEyrK8yT0Ue2_de6s-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};