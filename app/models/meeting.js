"use strict";
// Constructor
function Meeting(id) {

  this.id = id;
  this.name = ''; // default value
  this.do = function (){
    console.log(this.id);
  };
  
}

// export the class
module.exports = Meeting;