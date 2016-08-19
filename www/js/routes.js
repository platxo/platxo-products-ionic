var productsRoutes = angular.module('productsRoutes', []);

productsRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    // Products
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

    // Categories
    .state('tab.category-list', {
      url: '/category-list',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-list.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-detail', {
      url: '/category-detail/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-detail.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-create', {
      url: '/category-create',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-create.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-update', {
      url: '/category-update/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-update.html',
          controller: 'categoryController'
        }
      }
    })
    .state('tab.category-delete', {
      url: '/category-delete/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-delete.html',
          controller: 'categoryController'
        }
      }
    })

    // Types
    .state('tab.type-list', {
      url: '/type-list',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-list.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-detail', {
      url: '/type-detail/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-detail.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-create', {
      url: '/type-create',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-create.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-update', {
      url: '/type-update/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-update.html',
          controller: 'typeController'
        }
      }
    })
    .state('tab.type-delete', {
      url: '/type-delete/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-delete.html',
          controller: 'typeController'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/product-list');

}]);
