'use strict';
appServices.factory('todoService', ['$rootScope', '$http', 'socket', function ($rootScope, $http, socket) {

    console.log('todoService:ctor');    
    var socket = io.connect(window.location.origin + '/todos');
    
    return {

        api: {

            get: function (qs) {

                if (qs) {
                    return $http.get('/api/v1/todos' + qs);
                }
                else {

                    return $http.get('/api/v1/todos');
                }

            },
            create: function (item) {
                return $http.post('/api/v1/todos', item);
            },
            getById: function (id) {
                return $http.get('/api/v1/todos/' + id, id);
            },
            update: function (id, item) {
                return $http.put('/api/v1/todos/' + id, item);
            },
            delete: function (id) {
                return $http.delete('/api/v1/todos/' + id);
            }
        },

        live: {
            onTodoCreated: function (callback) {
                socket.on('post', function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            onTodoDeleted: function (callback) {
                socket.on('delete', function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            onTodoUpdated: function (callback) {
                socket.on('put', function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
        }
    }
}]);