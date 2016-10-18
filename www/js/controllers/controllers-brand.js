var brandControllers = angular.module('brandControllers', []);

brandControllers.controller('brandListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$cordovaBarcodeScanner',
  'brandService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $cordovaBarcodeScanner,
    brandService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  brandService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.brands = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
	  		})
      })

      $scope.refresh = function () {
        brandService.list()
    	  	.$promise
    	  		.then(function (res) {
    	  			$scope.brands = res
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
        $brand.path('/tab/product-detail/' + product);
      } else {
        $state.go('tab.product-list');
      }
    }, function (err) {
        alert("Scanning failed: " + err);
       });
    }

	  $scope.$on('$stateChangeSuccess', function() {
      brandService.list()
  	  	.$promise
  	  		.then(function (res) {
  	  			$scope.brands = res
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

brandControllers.controller('brandDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'brandService',
  '$rootScope',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    brandService,
    $rootScope
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    brandService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.brand = res
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

brandControllers.controller('brandCreateCtrl', [
  '$scope',
  '$state',
  'brandService',
  '$rootScope',
  function(
    $scope,
    $state,
    brandService,
    $rootScope
  )
  {
	  $scope.brand = {}

	  $scope.create = function () {
      $scope.brand.business = $rootScope.currentBusiness.id;
      $scope.brand.employee = $rootScope.currentEmployee.id;
	    brandService.create($scope.brand)
	    	.$promise
	    		.then(function (res) {
				    $state.go('brand-list');
	    		}, function (err) {

	    		})
	  }

	  $scope.cancel = function () {
	    $state.go('brand-list');
	  }

	}
]);

brandControllers.controller('brandUpdateCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$ionicLoading',
  'brandService',
  function(
    $scope,
    $state,
    $stateParams,
    $ionicLoading,
    brandService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    brandService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.brand = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.update = function () {
	    brandService.update($scope.brand)
	    	.$promise
	    		.then(function (res) {
				    $state.go('brand-list');
	    		}, function (err) {

	    		})
	  }

	  $scope.cancel = function () {
	    $state.go('brand-list');
	  }

	}
]);

brandControllers.controller('brandDeleteCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$ionicLoading',
  'brandService',
  function(
    $scope,
    $state,
    $stateParams,
    $ionicLoading,
    brandService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    brandService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.brand = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.delete = function () {
	    brandService.delete($scope.brand)
      	.$promise
      		.then(function (res) {
				    $state.go('brand-list');
      		}, function (err) {

      		})
    	  }

	  $scope.cancel = function () {
	    $state.go('brand-list');
	  }

	}
]);
