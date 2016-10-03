var categoryControllers = angular.module('categoryControllers', []);

categoryControllers.controller('categoryController', [
  '$scope',
  '$stateParams',
  '$state',
  'categoryService',
  '$rootScope',
  function(
    $scope,
    $stateParams,
    $state,
    categoryService,
    $rootScope
  )
  {
	  $scope.categories = categoryService.list();
	  $scope.create = function () {
	  	$scope.category.user = $rootScope.currentUser.url
      $scope.category.business = $rootScope.currentBusiness;
      $scope.category.employee = $rootScope.currentEmployee;
	    categoryService.create($scope.category);
	    $scope.categories = categoryService.list();
	    $state.go('tab.category-list');
	  }

	  $scope.update = function () {
	    categoryService.update($scope.category);
	    $scope.categories = categoryService.list();
	    $state.go('tab.category-list');
	  }

	  $scope.delete = function () {
	    categoryService.delete($scope.category);
	    $scope.categories = categoryService.list();
	    $state.go('tab.category-list');
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
