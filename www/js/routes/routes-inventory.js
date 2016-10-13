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
  .state('inventory-section', {
    url: '/inventory-section',
    templateUrl: 'templates/inventory/inventory-section.html',
    controller: 'sectionController'
  })

}]);
