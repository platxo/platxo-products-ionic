var typeControllers = angular.module('typeControllers', []);

typeControllers.controller('typeController', [
  '$scope',
  '$stateParams',
  '$state',
  'typeService',
  'categoryService',
  function(
    $scope,
    $stateParams,
    $state,
    typeService,
    categoryService
  )
  {
	  $scope.types = typeService.list();
	  $scope.type = typeService.detail({id: $stateParams.id});
	  $scope.categories = categoryService.list();

	  $scope.create = function () {
	    typeService.create($scope.type);
	    $scope.types = typeService.list();
	    $state.go('tab.type-list');
	  }

	  $scope.update = function () {
	    typeService.update($scope.type);
	    $scope.types = typeService.list();
	    $state.go('tab.type-list');
	  }

	  $scope.delete = function () {
	    typeService.delete($scope.type);
	    $scope.types = typeService.list();
	    $state.go('tab.type-list');
	  }

	  $scope.cancel = function () {
	    $state.go('tab.type-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.types = typeService.list();
	  })

	}
]);
