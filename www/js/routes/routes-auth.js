var authRoutes = angular.module('authRoutes', []);

authRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/auth/auth-signup.html',
    controller: 'signupController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/auth/auth-login.html',
    controller: 'loginController'
  })
  .state('forgot-password', {
    url: '/forgot-password',
    templateUrl: 'templates/auth/auth-forgot-password.html',
    controller: 'forgotPasswordController'
  })
  .state('profile', {
    url: '/profile/:id',
    templateUrl: 'templates/auth/auth-profile.html',
    controller: 'profileController'
  })

  $urlRouterProvider.otherwise('/login');

}]);
