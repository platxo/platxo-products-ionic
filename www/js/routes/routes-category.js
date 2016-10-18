var categoryRoutes = angular.module('categoryRoutes', []);

categoryRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab.category-list', {
      url: '/category-list',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-list.html',
          controller: 'categoryListCtrl'
        }
      }
    })
    .state('tab.category-detail', {
      url: '/category-detail/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-detail.html',
          controller: 'categoryDetailCtrl'
        }
      }
    })
    .state('tab.category-create', {
      url: '/category-create',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-create.html',
          controller: 'categoryCreateCtrl'
        }
      }
    })
    .state('tab.category-update', {
      url: '/category-update/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-update.html',
          controller: 'categoryUpdateCtrl'
        }
      }
    })
    .state('tab.category-delete', {
      url: '/category-delete/:id',
      views: {
        'tab-categories': {
          templateUrl: 'templates/category/category-delete.html',
          controller: 'categoryDeleteCtrl'
        }
      }
    })

    $urlRouterProvider.otherwise('/login');

}]);
