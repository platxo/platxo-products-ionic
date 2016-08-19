var productsRoutes = angular.module('productsRoutes', []);

productsRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Products
  	.state('product-list', {
  	  url: '/product-list',
      templateUrl: 'templates/product/product-list.html',
      controller: 'productController'
  	})
  	.state('product-detail', {
      url: '/product-detail/:id',
      templateUrl: 'templates/product/product-detail.html',
      controller: 'productController'
    })
    .state('product-create', {
      url: '/product-create',
      templateUrl: 'templates/product/product-create.html',
      controller: 'productController'
    })
    .state('product-update', {
      url: '/product-update/:id',
      templateUrl: 'templates/product/product-update.html',
      controller: 'productController'
    })
    .state('product-delete', {
      url: '/product-delete/:id',
      templateUrl: 'templates/product/product-delete.html',
      controller: 'productController'
    })

    // Categories
    .state('category-list', {
      url: '/category-list',
      templateUrl: 'templates/category/category-list.html',
      controller: 'categoryController'
    })
    .state('category-detail', {
      url: '/category-detail/:id',
      templateUrl: 'templates/category/category-detail.html',
      controller: 'categoryController'
    })
    .state('category-create', {
      url: '/category-create',
      templateUrl: 'templates/category/category-create.html',
      controller: 'categoryController'
    })
    .state('category-update', {
      url: '/category-update/:id',
      templateUrl: 'templates/category/category-update.html',
      controller: 'categoryController'
    })
    .state('category-delete', {
      url: '/category-delete/:id',
      templateUrl: 'templates/category/category-delete.html',
      controller: 'categoryController'
    })

    // Types
    .state('type-list', {
      url: '/type-list',
      templateUrl: 'templates/type/type-list.html',
      controller: 'typeController'
    })
    .state('type-detail', {
      url: '/type-detail/:id',
      templateUrl: 'templates/type/type-detail.html',
      controller: 'typeController'
    })
    .state('type-create', {
      url: '/type-create',
      templateUrl: 'templates/type/type-create.html',
      controller: 'typeController'
    })
    .state('type-update', {
      url: '/type-update/:id',
      templateUrl: 'templates/type/type-update.html',
      controller: 'typeController'
    })
    .state('type-delete', {
      url: '/type-delete/:id',
      templateUrl: 'templates/type/type-delete.html',
      controller: 'typeController'
    })

  $urlRouterProvider.otherwise('/product-list');

}]);
