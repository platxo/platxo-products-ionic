var locationRoutes = angular.module('locationRoutes', []);

locationRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('location-list', {
    url: '/location-list',
    templateUrl: 'templates/location/location-list.html',
    controller: 'locationListCtrl'
  })
  .state('location-detail', {
    url: '/location-detail/:id',
    templateUrl: 'templates/location/location-detail.html',
    controller: 'locationDetailCtrl'
  })
  .state('location-create', {
      url: '/location-create',
      templateUrl: 'templates/location/location-create.html',
      controller: 'locationCreateCtrl'
    })
  .state('location-update', {
      url: '/location-update/:id',
      templateUrl: 'templates/location/location-update.html',
      controller: 'locationUpdateCtrl'
    })
  .state('location-delete', {
    url: '/location-delete/:id',
    templateUrl: 'templates/location/location-delete.html',
    controller: 'locationDeleteCtrl'
  })

  $urlRouterProvider.otherwise('/login');

}]);
