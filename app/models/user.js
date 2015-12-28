"use strict";
var Token = require('./token.js');

function User(){

   // Add object properties like this
   this.id = '';
   this.gender = '';
   this.firstname = '';
   this.lastname = '';
   this.title = '';
   this.email = '';
   this.username = '';
   this.password = '';
   this.phone = '';   
   this.externalId = '';   
}

// Add methods like this.  All Person objects will be able to invoke this
User.prototype.toToken = function(){
    return new Token(this.id, this.firstName + ' ' + this.lastName, 'User', this.email, 'unknown');
};

module.exports = User;

/*module.exports = {
    "gender": "unknown",
    "name" : "",
    "firstname": "",
    "lastname": "",
    "title": "",
    "location": {
        "street": "",
        "city": "",
        "state": "",
        "zip": ""
    },
    "email": "",
    "username": "",
    "password": "",
    "salt": "",
    "md5": "",
    "sha1": "",
    "sha256": "",
    "registered": false,
    "dob": 0,
    "phone": "",
    "cell": "",
    "HETU": "",
    "picture": {
        "large": "",
        "medium": "",
        "thumbnail": ""
    }
};*/
