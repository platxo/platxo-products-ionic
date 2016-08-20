var productControllers = angular.module('productControllers', []);

productControllers.controller('productController', [
  '$scope',
  '$stateParams',
  '$state',
  'productService',
  'categoryService',
  'typeService',
  function(
    $scope,
    $stateParams,
    $state,
    productService,
    categoryService,
    typeService
  )
  {
	  $scope.products = productService.list();
	  $scope.product = productService.detail({id: $stateParams.id});
	  $scope.categories = categoryService.list();
	  $scope.types = typeService.list();

	  $scope.create = function () {
	    productService.create($scope.product);
	    $scope.products = productService.list();
	    $state.go('tab.product-list');
	  }

	  $scope.update = function () {
	    productService.update($scope.product);
	    $scope.products = productService.list();
	    $state.go('tab.product-list');
	  }

	  $scope.delete = function () {
	    productService.delete($scope.product);
	    $scope.products = productService.list();
	    $state.go('tab.product-list');
	  }

	  $scope.cancel = function () {
	    $state.go('tab.product-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.products = productService.list();
	  })

	}
]);
