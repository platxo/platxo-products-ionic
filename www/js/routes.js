var productsRoutes = angular.module('productsRoutes', []);

productsRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
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

  $urlRouterProvider.otherwise('/product-list');

}]);
