var locationControllers = angular.module('locationControllers', []);

locationControllers.controller('locationListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$cordovaBarcodeScanner',
  'locationService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $cordovaBarcodeScanner,
    locationService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  locationService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.locations = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
	  		})
      })

      $scope.refresh = function () {
        locationService.list()
    	  	.$promise
    	  		.then(function (res) {
    	  			$scope.locations = res
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
    	  		}, function (err) {
              $ionicLoading.hide();
              $ionicLoading.show({
                template: 'Network Error',
                scope: $scope
    	  		})
          })
      }

    $scope.scan = function () {
    $cordovaBarcodeScanner.scan().then( function (data) {
      var product = data.text
      if (product){
        $location.path('/tab/product-detail/' + product);
      } else {
        $state.go('tab.product-list');
      }
    }, function (err) {
        alert("Scanning failed: " + err);
       });
    }

	  $scope.$on('$stateChangeSuccess', function() {
      locationService.list()
  	  	.$promise
  	  		.then(function (res) {
  	  			$scope.locations = res
            $ionicLoading.hide();
  	  		}, function (err) {
            $ionicLoading.hide();
            $ionicLoading.show({
              template: 'Network Error',
              scope: $scope
  	  		})
        })
	  })

	}
]);

locationControllers.controller('locationDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'locationService',
  '$rootScope',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    locationService,
    $rootScope
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    locationService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.location = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

	}
]);

locationControllers.controller('locationCreateCtrl', [
  '$scope',
  '$state',
  'locationService',
  '$rootScope',
  function(
    $scope,
    $state,
    locationService,
    $rootScope
  )
  {
	  $scope.location = {}

	  $scope.create = function () {
      $scope.location.business = $rootScope.currentBusiness.id;
      $scope.location.employee = $rootScope.currentEmployee.id;
	    locationService.create($scope.location)
	    	.$promise
	    		.then(function (res) {
				    $state.go('location-list');
	    		}, function (err) {

	    		})
	  }

	  $scope.cancel = function () {
	    $state.go('location-list');
	  }

	}
]);

locationControllers.controller('locationUpdateCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$ionicLoading',
  'locationService',
  function(
    $scope,
    $state,
    $stateParams,
    $ionicLoading,
    locationService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    locationService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.location = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.update = function () {
	    locationService.update($scope.location)
	    	.$promise
	    		.then(function (res) {
				    $state.go('location-list');
	    		}, function (err) {

	    		})
	  }

	  $scope.cancel = function () {
	    $state.go('location-list');
	  }

	}
]);

locationControllers.controller('locationDeleteCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$ionicLoading',
  'locationService',
  function(
    $scope,
    $state,
    $stateParams,
    $ionicLoading,
    locationService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    locationService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.location = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.delete = function () {
	    locationService.delete($scope.location)
      	.$promise
      		.then(function (res) {
				    $state.go('location-list');
      		}, function (err) {

      		})
    	  }

	  $scope.cancel = function () {
	    $state.go('location-list');
	  }

	}
]);
