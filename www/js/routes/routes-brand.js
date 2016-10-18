var brandRoutes = angular.module('brandRoutes', []);

brandRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('brand-list', {
    url: '/brand-list',
    templateUrl: 'templates/brand/brand-list.html',
    controller: 'brandListCtrl'
  })
  .state('brand-detail', {
    url: '/brand-detail/:id',
    templateUrl: 'templates/brand/brand-detail.html',
    controller: 'brandDetailCtrl'
  })
  .state('brand-create', {
      url: '/brand-create',
      templateUrl: 'templates/brand/brand-create.html',
      controller: 'brandCreateCtrl'
    })
  .state('brand-update', {
      url: '/brand-update/:id',
      templateUrl: 'templates/brand/brand-update.html',
      controller: 'brandUpdateCtrl'
    })
  .state('brand-delete', {
    url: '/brand-delete/:id',
    templateUrl: 'templates/brand/brand-delete.html',
    controller: 'brandDeleteCtrl'
  })

  $urlRouterProvider.otherwise('/login');

}]);
