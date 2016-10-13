var settingsRoutes = angular.module('settingRoutes', []);

settingsRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('settings-list', {
    url: '/settings-list',
    templateUrl: 'templates/settings/settings-list.html',
    controller: 'settingsController'
  })
}]);
