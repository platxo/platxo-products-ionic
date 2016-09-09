var authControllers = angular.module('authControllers', []);

authControllers.controller('signupController', [
  '$scope',
  '$stateParams',
  '$state',
  'signupService',
  '$ionicModal',
  '$location',
  function(
    $scope,
    $stateParams,
    $state,
    signupService,
    $ionicModal,
    $location
  )
  {
    $scope.user = {}

    $scope.create = function () {
      $scope.user.is_employed = true;
      signupService.create($scope.user)
        .$promise
          .then(function (response) {
            $scope.user = {};
            $location.path('/login');
          }, function (reason) {
            $scope.user = {};
            $scope.errors = reason;
          })
    }

  }
]);

authControllers.controller('loginController', [
  '$scope',
  '$stateParams',
  '$state',
  'loginService',
  '$ionicModal',
  '$rootScope',
  '$location',
  function(
    $scope,
    $stateParams,
    $state,
    loginService,
    $ionicModal,
    $rootScope,
    $location
  )
  {
    $scope.user = {}

    $scope.create = function () {
      loginService.create($scope.user)
        .$promise
          .then(function (response) {
            $scope.user = {};
            $rootScope.token = response.token;
            localStorage.setItem("token", JSON.stringify($rootScope.token));
            localStorage.setItem('user', JSON.stringify(response.user));
            $location.path('/business');
          }, function (reason) {
            $scope.user = {};
            $scope.errors = reason;
          })
    }

  }
]);
