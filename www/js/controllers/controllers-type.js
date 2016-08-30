var typeControllers = angular.module('typeControllers', []);

typeControllers.controller('typeController', [
  '$scope',
  '$stateParams',
  '$state',
  'typeService',
  'categoryService',
  '$ionicModal',
  function(
    $scope,
    $stateParams,
    $state,
    typeService,
    categoryService,
    $ionicModal
  )
  {
	  $scope.types = typeService.list();
	  $scope.type = typeService.detail({id: $stateParams.id});
	  $scope.categories = categoryService.list();

	  $scope.create = function () {
      $scope.type.user = $rootScope.currentUser.url
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
      $scope.type.category = category.name;
      $scope.type.product_category = category.url;
      $scope.categoryModal.hide();
    };

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.types = typeService.list();
	  })

	}
]);
