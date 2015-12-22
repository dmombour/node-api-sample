angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/v1/todos');
			},
            create : function(item) {
				return $http.post('/api/v1/todos', item);
			},
			getById : function(id) {
				return $http.get('/api/v1/todos/', id);
			},
			delete : function(id) {
				return $http.delete('/api/v1/todos/' + id);
			}
		}
	}]);