var categoryControllers = angular.module('categoryControllers', []);

categoryControllers.controller('categoryController', [
  '$scope',
  '$state',
  'categoryService',
  '$rootScope',
  function(
    $scope,
    $state,
    categoryService,
    $rootScope
  )
  {
	  categoryService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.categories = res
	  		}, function (error) {

	  		})
	  $scope.category = {}

	  $scope.create = function () {
      $scope.category.business = $rootScope.currentBusiness;
      $scope.category.employee = $rootScope.currentEmployee.id;
	    categoryService.create($scope.category)
	    	.$promise
	    		.then(function (res) {
				    $scope.categories = categoryService.list();
				    $state.go('tab.category-list');
	    		}, function (error) {
	    			
	    		})
	  }

	  $scope.update = function () {
	    categoryService.update($scope.category)
	    	.$promise
	    		.then(function (res) {
				    $scope.categories = categoryService.list();
				    $state.go('tab.category-list');
	    		}, function (error) {
	    			
	    		})
	  }

	  $scope.delete = function () {
	    categoryService.delete($scope.category)
      	.$promise
      		.then(function (res) {
				    $scope.categories = categoryService.list();
				    $state.go('tab.category-list');
      		}, function (error) {
      			
      		})
	  }

	  $scope.cancel = function () {
	    $state.go('tab.category-list');
	  }

	  $scope.detail = function (category) {
	    $rootScope.selectedCategory = category;
	    $state.go('tab.category-detail', { 'id': category.id });
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.categories = categoryService.list();
	  })

	}
]);
