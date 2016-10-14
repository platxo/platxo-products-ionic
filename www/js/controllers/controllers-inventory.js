var inventoryControllers = angular.module('inventoryControllers', []);

inventoryControllers.controller('locationController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicPopup',
  'locationService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicLoading,
    $ionicPopup,
    locationService
  )
  {
    
    $scope.location = {}

    locationService.list()
      .$promise
        .then(function (res) {
          $scope.locations = res;
        }, function (error) {
          debugger
        })

    $scope.create = function () {
      debugger
      $scope.location.business = $rootScope.currentBusiness;
      $scope.location.employee = $rootScope.currentEmployee.id;
      locationService.create($scope.location)
        .$promise
          .then(function (res) {
            locationService.list()
              .$promise
                .then(function (res) {
                  $scope.locations = res;
                }, function (error) {
                  debugger
                })
            $state.go('inventory-location');
          }, function (error) {
            
          })
    }

    $scope.locationDelete= function(location) {
      $scope.location = location
       var confirmPopup = $ionicPopup.confirm({
         title: 'Delete location',
         template: 'Are you sure you want to delete {{location.name}}?',
         scope: $scope
       });
       confirmPopup.then(function(res) {
         if(res) {
           locationService.delete(location)
             .$promise
               .then(function (res) {
                 locationService.list()
                 .$promise
                   .then(function (res) {
                     $ionicLoading.hide();
                     $scope.locations = res
                   }, function (err) {
                     $ionicLoading.hide();
                     $ionicLoading.show({
                       template: 'Network Error',
                       scope: $scope
                     })
                   })
                 $state.go('settings-taxes');
               }, function (err) {

               })
         } else {

         }
       });
     };

    $scope.cancel = function () {
      $state.go('inventory-location');
    }


	}
]);

inventoryControllers.controller('sectionController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicModal',
  'locationService',
  'sectionService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicLoading,
    $ionicModal,
    locationService,
    sectionService
  )
  {

    $scope.section = {}

    locationService.list()
      .$promise
        .then(function (res) {
          $scope.locations = res;
        }, function (error) {
          debugger
        })

    sectionService.list()
      .$promise
        .then(function (res) {
          $scope.sections = res;
        }, function (error) {
          debugger
        })

    $scope.create = function () {
      debugger
      $scope.section.business = $rootScope.currentBusiness;
      $scope.section.employee = $rootScope.currentEmployee.id;
      sectionService.create($scope.section)
        .$promise
          .then(function (res) {
            locationService.list()
              .$promise
                .then(function (res) {
                  $scope.sections = res;
                }, function (error) {
                  debugger
                })
            $state.go('inventory-section');
          }, function (error) {
            
          })
    }

    //Modal select location
    $ionicModal.fromTemplateUrl('templates/inventory/select-location.html', {
      scope: $scope,
      controller: 'sectionController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
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
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.locationModal.remove();
    });

    $scope.selectLocation = function(location) {
      debugger
      $scope.section.location_name = location.name;
      $scope.section.location = location.id;
      $scope.locationModal.hide();
    };

    $scope.sectionDelete= function(section) {
      $scope.section = section
       var confirmPopup = $ionicPopup.confirm({
         title: 'Delete section',
         template: 'Are you sure you want to delete {{section.name}}?',
         scope: $scope
       });
       confirmPopup.then(function(res) {
         if(res) {
           sectionService.delete(section)
             .$promise
               .then(function (res) {
                 sectionService.list()
                 .$promise
                   .then(function (res) {
                     $ionicLoading.hide();
                     $scope.sections = res
                   }, function (err) {
                     $ionicLoading.hide();
                     $ionicLoading.show({
                       template: 'Network Error',
                       scope: $scope
                     })
                   })
                 $state.go('settings-taxes');
               }, function (err) {

               })
         } else {

         }
       });
     };

     $scope.cancel = function () {
      $state.go('inventory-section');
    }

  }
]);