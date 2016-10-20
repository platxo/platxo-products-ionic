var categoryControllers = angular.module('categoryControllers', []);

categoryControllers.controller('categoryListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$cordovaBarcodeScanner',
  'categoryService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $cordovaBarcodeScanner,
    categoryService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  categoryService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.categories = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
	  		})
      })

      $scope.refresh = function () {
        categoryService.list()
    	  	.$promise
    	  		.then(function (res) {
    	  			$scope.categories = res
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
      categoryService.list()
  	  	.$promise
  	  		.then(function (res) {
  	  			$scope.categories = res
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

categoryControllers.controller('categoryDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'categoryService',
  '$rootScope',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    categoryService,
    $rootScope
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    categoryService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.category = res
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

categoryControllers.controller('categoryCreateCtrl', [
  '$scope',
  '$state',
  'categoryService',
  '$rootScope',
  function(
    $scope,
    $state,
    categoryService,
    $rootScope
  )
  {
	  $scope.category = {}

	  $scope.create = function () {
      $scope.category.business = $rootScope.currentBusiness.id;
      $scope.category.employee = $rootScope.currentEmployee.id;
	    categoryService.create($scope.category)
	    	.$promise
	    		.then(function (res) {
				    $scope.categories = categoryService.list();
				    $state.go('tab.category-list');
	    		}, function (err) {

	    		})
	  }

	  $scope.cancel = function () {
	    $state.go('tab.category-list');
	  }

	}
]);

categoryControllers.controller('categoryUpdateCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$ionicLoading',
  'categoryService',
  function(
    $scope,
    $state,
    $stateParams,
    $ionicLoading,
    categoryService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    categoryService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.category = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.update = function () {
	    categoryService.update($scope.category)
	    	.$promise
	    		.then(function (res) {
				    $state.go('tab.category-list');
	    		}, function (err) {

	    		})
	  }

	  $scope.cancel = function () {
	    $state.go('tab.category-list');
	  }

	}
]);

categoryControllers.controller('categoryDeleteCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$ionicLoading',
  'categoryService',
  function(
    $scope,
    $state,
    $stateParams,
    $ionicLoading,
    categoryService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    categoryService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.category = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.delete = function () {
	    categoryService.delete($scope.category)
      	.$promise
      		.then(function (res) {
				    $state.go('tab.category-list');
      		}, function (err) {

      		})
    	  }

	  $scope.cancel = function () {
	    $state.go('tab.category-list');
	  }

	}
]);
