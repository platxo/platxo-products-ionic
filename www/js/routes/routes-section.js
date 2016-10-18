var sectionRoutes = angular.module('sectionRoutes', []);

sectionRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('section-list', {
    url: '/section-list',
    templateUrl: 'templates/section/section-list.html',
    controller: 'sectionListCtrl'
  })
  .state('section-detail', {
    url: '/section-detail/:id',
    templateUrl: 'templates/section/section-detail.html',
    controller: 'sectionDetailCtrl'
  })
  .state('section-create', {
      url: '/section-create',
      templateUrl: 'templates/section/section-create.html',
      controller: 'sectionCreateCtrl'
    })
  .state('section-update', {
      url: '/section-update/:id',
      templateUrl: 'templates/section/section-update.html',
      controller: 'sectionUpdateCtrl'
    })
  .state('section-delete', {
    url: '/section-delete/:id',
    templateUrl: 'templates/section/section-delete.html',
    controller: 'sectionDeleteCtrl'
  })

  $urlRouterProvider.otherwise('/login');

}]);
