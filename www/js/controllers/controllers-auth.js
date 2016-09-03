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
      $scope.user.is_owner = false;
      $scope.user.is_customer = false;
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

    $scope.cancel = function () {
      $state.go('tab.product-list');
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
            $state.go('tab.product-list');
          }, function (reason) {
            $scope.user = {};
            $scope.errors = reason;
          })
    }

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

  }
]);
