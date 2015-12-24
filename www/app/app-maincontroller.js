'use strict';
appControllers.controller('mainController', ['$scope', '$http', 'loginService', 'localStorageService',
    function ($scope, $http, loginSvc, lsSvc) {

        this.isAuthorized = function () {
            var token = lsSvc.get('token');
            if (token) {
                // is the token valid
                // assign to the loginSvc
                loginSvc.setAccessToken(token);
                // attempt a retreival of me.. if not valid then we will redirect
                loginSvc.get()
                    .success(function (data) {
                        console.log('mainController:AUTHORIZED');
                    })
                    .error(function (data, status) {
                        console.error('mainController:NOT-AUTHORIZED');
                        loginSvc.setAccessToken(null);
                    });
            }
        }

        this.isAuthorized();

    }]);
