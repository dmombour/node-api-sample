"use strict";
var _ = require('lodash');
var users = require('./repository-users.js');
var todos = require('./repository-todos.js');
var User = require('../models/user.js');

// 
// In memory simple repository to represent a database data model
// =========================================================================

module.exports = {

    getUsers: function () {
        return users;
    },
    getUserById: function (id) {

        if (id) {

            var match = _.find(users, function (u) {
                return (u.id == id || u.externalId == id || u.email.trim().toLowerCase() == id.trim().toLowerCase());
            });

            if (match) {
                var user = new User();
                for (var prop in match) {
                    if (match.hasOwnProperty(prop)) {
                        user[prop] = match[prop];
                    }
                }
                return user;
            }
            else {
                return null;
            }
        }
    },
    addUser: function (item) {
        users.push(item);
        return item;
    },
    updateUser: function (item) {

        var index = _.findIndex(users, function (user) {
            return user.id == item.id;
        });

        if (index > 1) {
            users[index] = item;
        }

        return item;
    },
    deleteUserById: function (id) {

        users = _.remove(users, function (u) {
            return (u.email.trim().toLowerCase() == id.trim().toLowerCase() || u.username.trim().toLowerCase() == id.trim().toLowerCase());
        });

    },

    getTodos: function () {
        return todos;
    },
    getTodoById: function (id) {

        if (id) {

            var match = _.find(todos, function (item) {

                return (item.id == id);
            });

            return match;
        }
    },
    addTodo: function (text) {

        var last = _.last(todos);
        var newId = last.id + 1;

        var todo = { id: newId, text: text };
        todos.push(todo);
        return todo;
    },
    updateTodo: function (item) {

        var index = _.findIndex(todos, function (todo) {
            return todo.id == item.id;
        });

        if (index >= 0) {
            todos[index] = item;
        }

        return item;
    },
    deleteTodoById: function (id) {

        _.remove(todos, function (item) {
            return (item.id == id);
        });

    },

};