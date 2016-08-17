var productsControllers = angular.module('productsControllers', []);

productsControllers.controller('productController', [
  '$scope',
  '$stateParams',
  '$state',
  'productService',
  function(
    $scope,
    $stateParams,
    $state,
    productService
  )
  {
	  $scope.products = productService.list();
	  $scope.product = productService.detail({id: $stateParams.id});

	  $scope.create = function () {
	    productService.create($scope.product);
	    $scope.products = productService.list();
	    $state.go('product-list');
	  }

	  $scope.update = function () {
	    productService.update($scope.product);
	    $scope.products = productService.list();
	    $state.go('product-list');
	  }

	  $scope.delete = function () {
	    productService.delete($scope.product);
	    $scope.products = productService.list();
	    $state.go('product-list');
	  }

	  $scope.cancel = function () {
	    $state.go('product-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.products = productService.list();
	  })

	}
]);
