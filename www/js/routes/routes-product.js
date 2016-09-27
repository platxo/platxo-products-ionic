var productRoutes = angular.module('productRoutes', []);

productRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider    
  	.state('tab.product-list', {
  	  url: '/product-list',
      views: {
        'tab-products': {
          templateUrl: 'templates/product/product-list.html',
          controller: 'productController'
        }
      }
  	})
  	.state('tab.product-detail', {
      url: '/product-detail/:id',
      views: {
        'tab-products': {
          templateUrl: 'templates/product/product-detail.html',
          controller: 'productController'
        }
      }
    })
    .state('tab.product-create', {
      url: '/product-create',
      views: {
        'tab-products': {
          templateUrl: 'templates/product/product-create.html',
          controller: 'productController'
        }
      }
    })
    .state('tab.product-update', {
      url: '/product-update/:id',
      views: {
        'tab-products': {
          templateUrl: 'templates/product/product-update.html',
          controller: 'productController'
        }
      }
    })
    .state('tab.product-delete', {
      url: '/product-delete/:id',
      views: {
        'tab-products': {
          templateUrl: 'templates/product/product-delete.html',
          controller: 'productController'
        }
      }
    })

}]);
