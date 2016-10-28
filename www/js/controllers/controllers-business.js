var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessListCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'businessService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    businessService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

	  businessService.list()
      .$promise
        .then(function (res) {
          $scope.business = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          if (err.data.detail === "Signature has expired.") {
            $scope.showAlertExpired()
          }
        })

    $scope.selectBusiness = function(bs) {
      $rootScope.currentBusiness = bs
      window.localStorage.setItem('business', JSON.stringify($rootScope.currentBusiness));
      $state.go('tab.product-list');
    }

    $scope.refresh = function () {
      businessService.list()
        .$promise
          .then(function (res) {
            $scope.business = res
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
          }, function (err) {
            $ionicLoading.hide();
          })
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'business-list') {
        businessService.list()
          .$promise
            .then(function (res) {
              $scope.business = res
              $ionicLoading.hide();
            }, function (err) {
              $ionicLoading.hide();
            })
      }
	  })

	}
]);

businessControllers.controller('businessDetailCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'businessService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    businessService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    businessService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.bs = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });
	}
]);
