'use strict';
appServices.factory('loginService', ['$http', 'localStorageService', function ($http, lsSvc) {

    return {
        get: function () {
            return $http.get('/api/v1/token');
        },
        login: function (data) {
            return $http({
                method: 'POST',
                url: '/api/v1/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data,
                })
                .success(function (data) {            
                    
                    var token = data.access_token;
                    lsSvc.set('token', token);
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    console.log('loginService: success stored token and set on http', data);
                })
                .error(function (data, status) {
                    console.error('loginService:  error:', status, data);
                    lsSvc.set('token', null);
                    $http.defaults.headers.common['Authorization'] = '';
                });
        },
        getById: function (id) {
            return $http.get('/api/v1/todos/', id);
        },
        delete: function (id) {
            return $http.delete('/api/v1/todos/' + id);
        },
        setAccessToken: function (token) {
            lsSvc.set('token', token);
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }
}]);