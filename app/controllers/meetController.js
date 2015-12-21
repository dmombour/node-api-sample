"use strict";
/// <reference path="../../server.js"/>
/// <reference path="../models/meeting.js"/>
var Meeting = require('../models/meeting.js');

module.exports = function (app, router) {
    
    //http://localhost:8080/api/v1/meet
    var self = this;

    router.route('/meet')

    /**
     * @api {get} /meet/:id Get User information
     * @apiName GetUser
     * @apiGroup User
     *
    * @apiParam {Number} id Users unique ID.
    *
    * @apiSuccess {String} firstname Firstname of the User.
    * @apiSuccess {String} lastname  Lastname of the User.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "firstname": "John",
    *       "lastname": "Doe"
    *     }
    *
    * @apiError UserNotFound The <code>id</code> of the User was not found.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *       "error": "UserNotFound"
    *     }
    */
        .get(function (req, res) {

            var meet = new Meeting('1234');
            meet.do();
            res.json(meet);
            //res.json({ message: 'get' });
        })

        .post(function (req, res) {

            res.json({ message: 'post' });

        })

        .put(function (req, res) {

            res.json({ message: 'put' });
        })

        .delete(function (req, res) {
            res.json({ message: 'delete' });
        });

    router.route('/meet/:meetid')

        .get(function (req, res) {
            res.json({ message: 'get' });
        })

        .post(function (req, res) {

            res.json({ message: 'post' });

        })

        .put(function (req, res) {

            res.json({ message: 'put' });
        })

        .delete(function (req, res) {
            res.json({ message: 'delete' });
        });
}