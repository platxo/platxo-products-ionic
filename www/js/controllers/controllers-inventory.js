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
    locationService.list()
      .$promise
        .then(function (res) {
          $scope.locations = res;
        }, function (error) {
          debugger
        })

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


	}
]);

inventoryControllers.controller('sectionController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicPopup',
  'sectionService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicLoading,
    $ionicPopup,
    sectionService
  )
  {
    sectionService.list()
      .$promise
        .then(function (res) {
          $scope.sections = res;
        }, function (error) {
          debugger
        })

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


  }
]);