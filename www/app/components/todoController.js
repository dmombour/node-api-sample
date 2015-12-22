angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','todos', function($scope, $http, todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all and show them
		// use the service to get all 
		todos.get()
			.success(function(data) {
				$scope.todos = data.items;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
            
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				todos.create($scope.formData)                
					// if successful creation, update scope
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos.push(data);
					});
			}
		};

		// DELETE ==================================================================
		// delete an item after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
                    /* _.remove($scope.todos, function (item) {
                        return (item.id == id);
                    });*/
					//$scope.todos = data; // assign our new list of todos
				});
		};
	}]);