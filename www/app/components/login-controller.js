'use strict';
appControllers.controller('loginController', ['$scope', '$http', '$routeParams', '$location', 'loginService', 'localStorageService',
    function ($scope, $http, $routeParams, $location, loginSvc, lsSvc) {

        $scope.loading = true;
        $scope.message = '';
        $scope.username = '';
        $scope.password;
        $scope.access_token = $routeParams.access_token;

        console.log('loginController: routeParams', $routeParams);

        if ($routeParams.message) {
            $scope.message = $routeParams.message;
        }

        if ($scope.access_token) {
            console.log('loginController: we have a redirect token', $scope.access_token);
            loginSvc.setAccessToken($scope.access_token);
            
            // now test if this is valid..
            // attempt a retreival of me.. if not valid then we will redirect
                loginSvc.get()
                    .success(function (data) {
                        console.log('loginController:AUTHORIZED');
                        
                        $location.path('#/todo');
                    })
                    .error(function (data, status) {
                        console.error('loginController:NOT-AUTHORIZED');
                        loginSvc.setAccessToken(null);
                        
                        $location.path('#/login');
                    });
        }

        $scope.login = function (username, password) {

            console.log('login:', username, password);
            var loginRequest = { grant_type: 'password', username: username, password: password };

            loginSvc.login(loginRequest)
                .success(function (data) {

                    loginSvc.get()
                        .success(function (data) {
                            console.log('loginController:AUTHORIZED');
                        })
                        .error(function (data, status) {
                            console.error('loginController:NOT-AUTHORIZED');
                        });

                    console.log('loginController: success stored token', data);
                })
                .error(function (data, status) {
                    console.error('loginController:  error:', status, data);
                    password = '';
                });
        };

    }]);
