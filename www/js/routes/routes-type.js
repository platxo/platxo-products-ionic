var typeRoutes = angular.module('typeRoutes', []);

typeRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
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
