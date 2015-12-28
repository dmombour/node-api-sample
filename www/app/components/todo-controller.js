'use strict';
appControllers.controller('todoController', ['$scope', '$http', '$routeParams', '$location', 'todoService',
    function ($scope, $http, $routeParams, $location, todoSvc) {

        console.log('todoController:ctor');

        var self = this;

        $scope.formData = {};
        $scope.loading = true;
        $scope.selectedId = $routeParams.id;
        $scope.text;
        $scope.todos = {};

        console.log($routeParams.id);

        self.addTodo = function (item) {
            $scope.todos.items.push(item);
        };

        self.removeTodo = function (id) {
            _.remove($scope.todos.items, function (item) {
                return (item.id == id);
            });
        };

        self.updateTodo = function (item) {
            var index = _.findIndex($scope.todos.items, function (todo) {
                return todo.id == item.id;
            });

            if (index >= 0) {
                console.log('todoController.self.updateTodo:found item in index', index);
                $scope.todos.items[index] = item;
            }

        };
        
        // GET =====================================================================

        if ($scope.selectedId) {

            console.log('get by id', $scope.selectedId);

            todoSvc.api.getById($scope.selectedId)
                .success(function (data) {
                    console.log(data);
                    $scope.text = data.text;
                });
        }
        else {
            // when landing on the page, get all and show them
            // use the service to get all 
            $scope.loading = true;

            todoSvc.live.onTodoCreated(function (data) {
                console.log('todoSvc.live.onTodoCreated:', data);
                self.addTodo(data);
            });

            todoSvc.live.onTodoDeleted(function (id) {
                console.log('todoSvc.live.onTodoDeleted:', id);
                self.removeTodo(id);
            });

            todoSvc.live.onTodoUpdated(function (data) {
                console.log('todoSvc.live.onTodoUpdated:', data);
                self.updateTodo(data);
            });

            todoSvc.api.get()
                .success(function (data) {
                    $scope.todos = data;
                    $scope.loading = false;
                });
        }
        
       

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function () {
            
            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.text != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                todoSvc.api.create($scope.formData)                
                // if successful creation, update scope
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                    });
            }
        };

        // DELETE ==================================================================
        // delete an item after checking it
        $scope.deleteTodo = function (id) {
            $scope.loading = true;

            todoSvc.api.delete(id)
            // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    $scope.loading = false;
                });
        };
        
        // SAVE ==================================================================
        $scope.saveTodo = function (text) {
            $scope.loading = true;
            todoSvc.api.update($scope.selectedId, { text: text })
            // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    $scope.loading = false;
                    $location.path('#/todo');
                });
        };
        
        // EDIT ==================================================================
        $scope.editTodo = function (id) {
            $scope.loading = true;
            $location.path('#/todo/' + id);
        };       

        // MORE ==================================================================
        $scope.next = function (qs) {
            $scope.loading = true;

            todoSvc.api.get(qs)
                .success(function (data) {
                    $scope.todos = data;
                    $scope.loading = false;
                });
        };

    }]);
