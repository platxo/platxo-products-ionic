var typeControllers = angular.module('typeControllers', []);

typeControllers.controller('typeController', [
  '$scope',
  '$stateParams',
  '$state',
  'typeService',
  'categoryService',
  '$ionicModal',
  '$rootScope',
  function(
    $scope,
    $stateParams,
    $state,
    typeService,
    categoryService,
    $ionicModal,
    $rootScope
  )
  {
    typeService.list()
      .$promise
        .then(function (res) {
          $scope.types = res;
        }, function (error) {
          
        })
	  $scope.type = {}
	  categoryService.list()
      .$promise
        .then(function (res) {
           $scope.categories = res;
        }, function (error) {
          
        })

	  $scope.create = function () {
      $scope.type.business = $rootScope.currentBusiness;
      $scope.type.employee = $rootScope.currentEmployee.id;
	    typeService.create($scope.type)
        .$promise
          .then(function (res) {
      	    $scope.types = typeService.list();
      	    $state.go('tab.type-list');
          }, function (error) {
            
          })
	  }

	  $scope.update = function () {
	    typeService.update($scope.type)
        .$promise
          .then(function (res) {
      	    $scope.types = typeService.list();
      	    $state.go('tab.type-list');
          }, function (error) {
            
          })
	  }

	  $scope.delete = function () {
	    typeService.delete($scope.type)
        .$promise
          .then(function (res) {
      	    $scope.types = typeService.list();
      	    $state.go('tab.type-list');
          }, function (error) {
            
          })
	  }

	  $scope.cancel = function () {
	    $state.go('tab.type-list');
	  }

    $scope.detail = function (type) {
      $rootScope.selectedType = type;
      $state.go('tab.type-detail', { 'id': type.id });
    }

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/type/select-category.html', {
      scope: $scope,
      controller: 'typeController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.categoryModal = modal;
    });
    $scope.categoryOpenModal = function() {
      $scope.categoryModal.show();
    };
    $scope.categoryCloseModal = function() {
      $scope.categoryModal.hide();
    };
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.categoryModal.remove();
    });

    $scope.selectCategory = function(category) {
      $scope.type.product_category = category.id
      $scope.categoryModal.hide();
    };

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.types = typeService.list();
	  })

	}
]);
