'use strict';
appServices.factory('todoService', ['$http', function ($http) {
    return {
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
    }
}]);