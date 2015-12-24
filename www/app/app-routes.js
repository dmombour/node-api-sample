'use strict';
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
     when('/login', {
        templateUrl: 'app/components/login.html',
        controller: 'loginController'
      }).
      when('/login/:access_token', {
        templateUrl: 'app/components/login-redirect.html',
        controller: 'loginController'
      }).
      when('/todo', {
        templateUrl: 'app/components/todo.html',
        controller: 'todoController'
      }).
      when('/todo/:id', {
        templateUrl: 'app/components/todo-detail.html',
        controller: 'todoController'
      }).
      otherwise({
        redirectTo: '/todo'
      });
  }]);