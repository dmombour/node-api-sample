"use strict";
var Resource = require('./resource.js')
var util = require('util');

function Todo(id, text) {
  
   Resource.apply(this, arguments);
   
   this.id = id;
   this.text=text;

}

util.inherits(Todo, Resource);

Todo.prototype.toString=function(){ 
	return '[Todo "'+this.text+'"]';
}

// export the class
module.exports = Todo;