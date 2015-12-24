'use strict';
appServices.factory('loginService', ['$http', 'localStorageService', function ($http, lsSvc) {

    var url = '/api/v1/auth/token';
    
    return {
        get: function () {
            return $http.get(url);
        },
        login: function (data) {
            return $http({
                method: 'POST',
                url: url,
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
        setAccessToken: function (token) {
            lsSvc.set('token', token);
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }
}]);