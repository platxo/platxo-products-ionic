var productsControllers = angular.module('productsControllers', []);

productsControllers.controller('productController', [
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

productsControllers.controller('categoryController', [
  '$scope',
  '$stateParams',
  '$state',
  'categoryService',
  function(
    $scope,
    $stateParams,
    $state,
    categoryService
  )
  {
	  $scope.categories = categoryService.list();
	  $scope.category = categoryService.detail({id: $stateParams.id});
	  $scope.create = function () {
	    categoryService.create($scope.category);
	    $scope.categories = categoryService.list();
	    $state.go('category-list');
	  }

	  $scope.update = function () {
	    categoryService.update($scope.category);
	    $scope.categories = categoryService.list();
	    $state.go('category-list');
	  }

	  $scope.delete = function () {
	    categoryService.delete($scope.category);
	    $scope.categories = categoryService.list();
	    $state.go('category-list');
	  }

	  $scope.cancel = function () {
	    $state.go('category-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.categories = categoryService.list();
	  })

	}
]);

productsControllers.controller('typeController', [
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
	    $state.go('type-list');
	  }

	  $scope.update = function () {
	    typeService.update($scope.type);
	    $scope.types = typeService.list();
	    $state.go('type-list');
	  }

	  $scope.delete = function () {
	    typeService.delete($scope.type);
	    $scope.types = typeService.list();
	    $state.go('type-list');
	  }

	  $scope.cancel = function () {
	    $state.go('type-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.types = typeService.list();
	  })

	}
]);
