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
	  $scope.types = typeService.list();
	  $scope.categories = categoryService.list();

	  $scope.create = function () {
      debugger
      $scope.type.business = $rootScope.currentBusiness;
      $scope.type.employee = $rootScope.currentEmployee;
	    typeService.create($scope.type);
	    $scope.types = typeService.list();
	    $state.go('tab.type-list');
	  }

	  $scope.update = function () {
	    typeService.update($scope.type);
	    $scope.types = typeService.list();
	    $state.go('tab.type-list');
	  }

	  $scope.delete = function () {
	    typeService.delete($scope.type);
	    $scope.types = typeService.list();
	    $state.go('tab.type-list');
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
