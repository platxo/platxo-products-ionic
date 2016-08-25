var authRoutes = angular.module('authRoutes', []);

authRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })    
    .state('tab.auth-signup', {
      url: '/signup',
      views: {
        'tab-signup': {
          templateUrl: 'templates/auth/auth-signup.html',
          controller: 'signupController'
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/signup');

}]);
