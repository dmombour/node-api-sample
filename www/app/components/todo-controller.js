'use strict';
appControllers.controller('todoController', ['$scope', '$http', '$routeParams', '$location', 'socket', 'todoService',
    function ($scope, $http, $routeParams, $location, socket, todoSvc) {

        $scope.formData = {};
        $scope.loading = true;
        $scope.selectedId = $routeParams.id;
        $scope.text;
        $scope.todos;

        socket.on('news', function (data) {
            console.log('socket:', data);
            socket.emit('my other event', { my: 'data' });
        });

        console.log($routeParams.id);
        
        // GET =====================================================================
		
        if ($scope.selectedId) {

            console.log('get by id', $scope.selectedId);

            todoSvc.getById($scope.selectedId)
                .success(function (data) {
                    console.log(data);
                    $scope.text = data.text;
                });
        }
        else {
            // when landing on the page, get all and show them
            // use the service to get all 
            $scope.loading = true;

            todoSvc.get()
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
                todoSvc.create($scope.formData)                
                // if successful creation, update scope
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos.push(data);
                    });
            }
        };

        // DELETE ==================================================================
        // delete an item after checking it
        $scope.deleteTodo = function (id) {
            $scope.loading = true;

            todoSvc.delete(id)
            // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    $scope.loading = false;
                    _.remove($scope.todos, function (item) {
                        return (item.id == id);
                    });
        
                    /* _.remove($scope.todos, function (item) {
                        return (item.id == id);
                    });*/
                    //$scope.todos = data; // assign our new list of todos
                });
        };
        
        // SAVE ==================================================================
        $scope.saveTodo = function (text) {
            $scope.loading = true;
            todoSvc.update($scope.selectedId, { text: text })
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

            todoSvc.get(qs)
                .success(function (data) {
                    $scope.todos = data;
                    $scope.loading = false;
                });
        };

    }]);
