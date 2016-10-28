var sectionControllers = angular.module('sectionControllers', []);

sectionControllers.controller('sectionListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$cordovaBarcodeScanner',
  'sectionService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $cordovaBarcodeScanner,
    sectionService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  sectionService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.sections = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
          if (err.data.detail === "Signature has expired.") {
            $scope.showAlertExpired()
          }
        })

      $scope.refresh = function () {
        sectionService.list()
    	  	.$promise
    	  		.then(function (res) {
    	  			$scope.sections = res
              $ionicLoading.hide();
              $scope.$broadcast('scroll.refreshComplete');
    	  		}, function (err) {
              $ionicLoading.hide();
            })
      }

    $scope.scan = function () {
    $cordovaBarcodeScanner.scan().then( function (data) {
      var product = data.text
      if (product){
        $location.path('/tab/product-detail/' + product);
      } else {
        $state.go('product-list');
      }
    }, function (err) {
        alert("Scanning failed: " + err);
       });
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'section-list') {
        sectionService.list()
          .$promise
            .then(function (res) {
              $scope.sections = res
              $ionicLoading.hide();
            }, function (err) {
              $ionicLoading.hide();
            })
      }
	  })

	}
]);

sectionControllers.controller('sectionDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  '$state',
  'sectionService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    $state,
    sectionService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    sectionService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.section = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

	}
]);

sectionControllers.controller('sectionCreateCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'sectionService',
  'locationService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    $ionicModal,
    sectionService,
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
        })

	  $scope.section = {}

	  $scope.create = function () {
      $scope.section.business = $rootScope.currentBusiness.id;
      $scope.section.employee = $rootScope.currentEmployee.id;
	    sectionService.create($scope.section)
        .$promise
          .then(function (res) {
      	    $state.go('section-list');
          }, function (err) {

          })
	  }

    $scope.selectLocation = function(location) {
      $scope.section.location_name = location.name;
      $scope.section.location = location.id
      $scope.locationModal.hide();
    };

    //Modal select location
    $ionicModal.fromTemplateUrl('templates/section/select-location.html', {
      scope: $scope,
      controller: 'sectionCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.locationModal = modal;
    });
    $scope.locationOpenModal = function() {
      $scope.locationModal.show();
    };
    $scope.locationCloseModal = function() {
      $scope.locationModal.hide();
    };

    $scope.cancel = function () {
	    $state.go('section-list');
	  }

	}
]);

sectionControllers.controller('sectionUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicModal',
  '$ionicLoading',
  'sectionService',
  'locationService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicModal,
    $ionicLoading,
    sectionService,
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
        })

    sectionService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.section = res
          $scope.section.location_name = $scope.section.location_name;
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

    $scope.update = function () {
	    sectionService.update($scope.section)
        .$promise
          .then(function (res) {
      	    $state.go('section-list');
          }, function (err) {

          })
	  }

    $scope.selectLocation = function(location) {
      $scope.section.location_name = location.name;
      $scope.section.location = location.id
      $scope.locationModal.hide();
    };

    //Modal select location
    $ionicModal.fromTemplateUrl('templates/section/select-location.html', {
      scope: $scope,
      controller: 'sectionUpdateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.locationModal = modal;
    });
    $scope.locationOpenModal = function() {
      $scope.locationModal.show();
    };
    $scope.locationCloseModal = function() {
      $scope.locationModal.hide();
    };

    $scope.cancel = function () {
	    $state.go('section-list');
	  }

	}
]);

sectionControllers.controller('sectionDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'sectionService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    sectionService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    sectionService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.section = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });


    $scope.delete = function () {
	    sectionService.delete($scope.section)
        .$promise
          .then(function (res) {
      	    $state.go('section-list');
          }, function (err) {

          })
	  }

    $scope.cancel = function () {
	    $state.go('section-list');
	  }

	}
]);
