"use strict";
var _ = require('lodash');
var users = require('./users.js');
users = _.pluck(users.results, 'user');

module.exports = { 
   
    getUsers: function(){
        return users;
    },   
   
    getUserById: function(id){

         var match = _.find(users, function (u) {     

            return (u.email.trim().toLowerCase() == id.trim().toLowerCase() || u.username.trim().toLowerCase() == id.trim().toLowerCase());
            });
                    
        return match;
    },   
    
     deleteUserById: function(id){

         users = _.remove(users, function (u) {
                        return (u.email.trim().toLowerCase() == id.trim().toLowerCase() || u.username.trim().toLowerCase() == id.trim().toLowerCase());
                    });

    },   
    
};