var inventoryRoutes = angular.module('inventoryRoutes', []);

inventoryRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('inventory-list', {
    url: '/inventory-list',
    templateUrl: 'templates/inventory/inventory-list.html'
  })
  .state('inventory-location', {
    url: '/inventory-location',
    templateUrl: 'templates/inventory/inventory-location.html',
    controller: 'locationController'
  })
  .state('location-create', {
      url: '/inventory-location',
      templateUrl: 'templates/inventory/location-create.html',
      controller: 'locationController'
    })
  .state('section-create', {
      url: '/inventory-section',
      templateUrl: 'templates/inventory/section-create.html',
      controller: 'sectionController'
    })
  .state('inventory-section', {
    url: '/inventory-section',
    templateUrl: 'templates/inventory/inventory-section.html',
    controller: 'sectionController'
  })

}]);
