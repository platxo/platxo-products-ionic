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

  $urlRouterProvider.otherwise('/product-list');

}]);
