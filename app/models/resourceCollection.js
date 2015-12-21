"use strict";
var Resource = require('./resource')
var util = require('util');
var _ = require('lodash');

function ResourceCollection() {

    var self = this;

    Resource.apply(this, arguments);

    this.items = [];

    this.odataCollection = function (req, col, pagesize) {
       
       var results = col;
       
       // orderby => $orderby
       var orderby = req.query.$orderby;
       
       if (orderby){
           //var direction = 'asc';
           // we have a clause. check for multiples
           var fields = orderby.split(",");
           console.log(fields);
           results = _.sortBy(results, orderby)
       }
       
       
        // paging => $skip, $top
        var skip = Number(req.query.$skip ? req.query.$skip : 0);
        var top = Number(req.query.$top ? req.query.$top : (pagesize ? pagesize : 50));
        results = _.slice(col, skip, skip + top)
        self.items = results;      
        // next link
        if (self.items.length >= pagesize) {
            skip = skip + top;
            top = top;
            // build next url
            var shallow = _.clone(req.query);
            shallow['$skip'] = skip;
            shallow['$top'] = top;

            var keys = Object.keys(shallow);
            var query = "";
            
            for (var i = 0; i < keys.length; i++) { 
                
                if (i > 0) {
                    query += '&';
                }
                
                var key = keys[i];                
                query += key + '=' + shallow[key];
                
            }
            
            self.addLink('next', '/$skip=' + skip + '&$top=' + top);
        }
    };

}

util.inherits(ResourceCollection, Resource);

// export the class
module.exports = ResourceCollection;