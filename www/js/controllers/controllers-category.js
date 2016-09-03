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
	  $scope.category = categoryService.detail({id: $stateParams.id});
	  $scope.create = function () {
	  	$scope.category.user = $rootScope.currentUser.url
      $scope.category.business = $rootScope.currentBusiness;
      $scope.category.employed = $rootScope.currentEmployed;
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

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.categories = categoryService.list();
	  })

	}
]);
