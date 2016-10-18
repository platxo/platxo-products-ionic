var typeRoutes = angular.module('typeRoutes', []);

typeRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.type-list', {
      url: '/type-list',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-list.html',
          controller: 'typeListCtrl'
        }
      }
    })
    .state('tab.type-detail', {
      url: '/type-detail/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-detail.html',
          controller: 'typeDetailCtrl'
        }
      }
    })
    .state('tab.type-create', {
      url: '/type-create',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-create.html',
          controller: 'typeCreateCtrl'
        }
      }
    })
    .state('tab.type-update', {
      url: '/type-update/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-update.html',
          controller: 'typeUpdateCtrl'
        }
      }
    })
    .state('tab.type-delete', {
      url: '/type-delete/:id',
      views: {
        'tab-types': {
          templateUrl: 'templates/type/type-delete.html',
          controller: 'typeDeleteCtrl'
        }
      }
    })

   $urlRouterProvider.otherwise('/login');

}]);
