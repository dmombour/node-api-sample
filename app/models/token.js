"use strict";

// userToken - a simple class to serialize into a user claims token. 
// =========================================================================
function Token(id, name, type, email, authProvider){

   // Add object properties like this
   this.id = id;
   this.name = name;
   this.type = type;
   this.email = email;
   this.authProvider = authProvider;
}

// Add methods like this.  All Person objects will be able to invoke this
Token.prototype.toString = function(){
    console.log(this.id + "|" + this.name + "|" + this.type + "|" + this.email + "|" + this.authProvider);
};

module.exports = Token;