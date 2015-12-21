"use strict";
var Resource = require('./resource'), util = require('util');

function Sample(name) {
  
   Resource.apply(this, arguments);
   
   this.name=name;
   this.id;
}

util.inherits(Sample, Resource);

Sample.prototype.toString=function(){ 
	return '[Sample "'+this.name+'"]';
}

// export the class
module.exports = Sample;