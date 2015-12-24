"use strict";
var Resource = require('../models/resource.js');
var ResourceCollection = require('../models/resource-collection.js');
var Todo = require('../models/todo.js');
var _ = require('lodash');
var repo = require('../modules/repository.js');

module.exports = function (app, router) {

    var route = '/todos';
    router.route(route)
    /**
    * @api {get} /todos Get
    * @apiGroup Todos
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    *{
    *  "_links": {
    *    "self": "/api/v1/todos"
    *  },
    *  "items": [
    *    {
    *      "_links": {
    *        "self": "/api/v1/todos/0"
    *      },
    *      "name": "item_0",
    *      "id": 0
    *    },
    *    {
    *      "_links": {
    *        "self": "/api/v1/todos/1"
    *      },
    *      "name": "item_1",
    *      "id": 1
    *    }
    *  ]
    *}
    */
        .get(function (req, res) {

            var items = repo.getTodos();
            var result = new ResourceCollection();
            var pagesize = app.get('pagesize');
            result.odataCollection(req, items, pagesize);
            
            result.addLink('self', "/api/v1/todo");

            res.json(result);
        })
    /**
    * @api {post} /todo Create
    * @apiGroup Todos
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 201 Created
    * {
    *   "_links": {
    *     "self": "/api/v1/todo/0"
    *   },
    *   "name": "item",
    *   "id": 0
    * }
    */
        .post(function (req, res) {

            if (!req.body) {
                res.badRequest('you must specify a valid body');
            }
            else {
               
                var newItem = repo.addTodo(req.body.text);
                var todo = new Todo(newItem.id, newItem.text);
                var location = "/api/v1/todo/" + newItem.id.toString();
                todo.addLink('self', location);
                
                res.created(todo, location);
            }


        });

    router.route('/todos/:id')

    /**
    * @api {get} /todo:id Get by id
    * @apiParam {Number} id unique ID.
    * @apiGroup Todos
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "_links": {
    *     "self": "/api/v1/todo/0"
    *   },
    *   "name": "item",
    *   "id": 0
    * }
    */
        .get(function (req, res) {
            var id = parseInt(req.params.id);
            var match = repo.getTodoById(id);
            var todo = new Todo(id, match.text);
            
            if (todo) {
                var location = "/api/v1/todo/" + id.toString();
                todo.addLink('self', location);
                res.ok(todo);
            }
            else {
                res.notFound();
            }
        })    

    /**
    * @api {put} /todo:id Update by id
    * @apiParam {Number} id unique ID.
    * @apiGroup Todos
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "_links": {
    *     "self": "/api/v1/todo/0"
    *   },
    *   "name": "item",
    *   "id": 0
    * }
    */
        .put(function (req, res) {

            if (!req.body && req.body.name) {
                res.badRequest('you must specify a valid body');
            }
            else {
                
                 var id = parseInt(req.params.id);
                //echo the object back
                var todo = new Todo(id, req.body.text);
                var location = "/api/v1/todo/" + id.toString();
                todo.addLink('self', location);
                    
                repo.updateTodo(todo);

                res.ok(todo);
            }
        })

    /**
    * @api {delete} /todo:id Delete by id
    * @apiParam {Number} id unique ID.
    * @apiGroup Todos
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    */
        .delete(function (req, res) {
            
            var id = parseInt(req.params.id);
            
            repo.deleteTodoById(id);
            res.ok();
        });





}