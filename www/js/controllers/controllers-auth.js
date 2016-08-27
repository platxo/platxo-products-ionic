var authControllers = angular.module('authControllers', []);

authControllers.controller('signupController', [
  '$scope',
  '$stateParams',
  '$state',
  'signupService',
  '$ionicModal',
  function(
    $scope,
    $stateParams,
    $state,
    signupService,
    $ionicModal
  )
  {
    $scope.user = {}

    $scope.create = function () {
      signupService.create($scope.user)
        .$promise
          .then(function (response) {
            // $rootScope.login = true;
            $scope.user = {};
            $state.go('tab.product-list');
          }, function (reason) {
            // $rootScope.login = false;
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
  function(
    $scope,
    $stateParams,
    $state,
    loginService,
    $ionicModal
  )
  {
    $scope.user = {}

    $scope.create = function () {
      loginService.create($scope.user)
        .$promise
          .then(function (response) {
            // $rootScope.login = true;
            $scope.user = {};
            $state.go('tab.product-list');
          }, function (reason) {
            // $rootScope.login = false;
            $scope.user = {};
            $scope.errors = reason;
          })
    }

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

  }
]);
