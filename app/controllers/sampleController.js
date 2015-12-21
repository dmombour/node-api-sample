"use strict";
var Resource = require('../models/resource');
var ResourceCollection = require('../models/resourcecollection');
var Sample = require('../models/sample');
var _ = require('lodash');

module.exports = function (app, router) {
    
    var self = this;    
    var route = '/sample';
    router.route(route)
/**
* @api {get} /sample Get
* @apiGroup Sample
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
*{
*  "_links": {
*    "self": "/api/v1/sample"
*  },
*  "items": [
*    {
*      "_links": {
*        "self": "/api/v1/sample/0"
*      },
*      "name": "item_0",
*      "id": 0
*    },
*    {
*      "_links": {
*        "self": "/api/v1/sample/1"
*      },
*      "name": "item_1",
*      "id": 1
*    }
*  ]
*}
*/
        .get(function (req, res) {

            var items = _.times(20, function(i){
                var sample = new Sample('item_' + i.toString());
                sample.id = i;
                 sample.addLink('self', "/api/v1/sample/" + i.toString());
                return sample;
            });
            
            var result = new ResourceCollection();             
            var pagesize = app.get('pagesize');
            result.odataCollection(req, items, pagesize);
           
            //result.items = items;
            result.addLink('self', "/api/v1/sample");           
            
            res.json(result);
        })
/**
* @api {post} /sample Create
* @apiGroup Sample
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 201 Created
* {
*   "_links": {
*     "self": "/api/v1/sample/0"
*   },
*   "name": "item",
*   "id": 0
* }
*/
        .post(function (req, res) {
            
            if (!req.body)
            {
                res.badRequest('you must specify a valid body');
            }
            else{
                //echo the object back
                var sample = new Sample(req.body.name);
                sample.id = req.body.id;
                var location =  "/api/v1/sample/" + req.body.id.toString();
                sample.addLink('self', location);
                
                res.created(sample, location);
            }


        });
        
    router.route('/sample/:id')

/**
* @api {get} /sample:id Get by id
* @apiParam {Number} id unique ID.
* @apiGroup Sample
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
*   "_links": {
*     "self": "/api/v1/sample/0"
*   },
*   "name": "item",
*   "id": 0
* }
*/
        .get(function (req, res) {
            
            var sample = new Sample('test');
            sample.id = req.params.id;
            var location =  "/api/v1/sample/" + req.body.id.toString();
            sample.addLink('self', location);
          
            res.ok(sample);
        })    

/**
* @api {put} /sample:id Update by id
* @apiParam {Number} id unique ID.
* @apiGroup Sample
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
*   "_links": {
*     "self": "/api/v1/sample/0"
*   },
*   "name": "item",
*   "id": 0
* }
*/
        .put(function (req, res) {
            
            if (!req.body && req.body.name)
            {
                res.badRequest('you must specify a valid body');
            }
            else{
                //echo the object back
                var sample = new Sample(req.body.name);
                sample.id = req.body.id;
                var location =  "/api/v1/sample/" + req.body.id.toString();
                sample.addLink('self', location);
                
                res.ok(sample);
            }
        })

/**
* @api {delete} /sample:id Delete by id
* @apiParam {Number} id unique ID.
* @apiGroup Sample
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
*/
        .delete(function (req, res) {
            // delete from the database
            res.ok();
        });



        

}