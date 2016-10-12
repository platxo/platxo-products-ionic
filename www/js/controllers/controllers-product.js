var productControllers = angular.module('productControllers', []);

productControllers.controller('productController', [
  '$scope',
  '$stateParams',
  '$state',
  'productService',
  'categoryService',
  'typeService',
  '$ionicModal',
  '$rootScope',
  '$cordovaCamera',
  function(
    $scope,
    $stateParams,
    $state,
    productService,
    categoryService,
    typeService,
    $ionicModal,
    $rootScope,
    $cordovaCamera
  )
  {
    $scope.products = productService.list();
    $scope.product = productService.detail({id: $stateParams.id});
    $scope.categories = categoryService.list();
    $scope.types = typeService.list();

	  $scope.create = function () {
      $scope.product.user = $rootScope.currentUser.url
      $scope.product.business = $rootScope.currentBusiness;
      $scope.product.employee = $rootScope.currentEmployee;
	    productService.create($scope.product);
	    $scope.products = productService.list();
	    $state.go('tab.product-list');
	  }

	  $scope.update = function () {
	    productService.update($scope.product);
	    $scope.products = productService.list();
	    $state.go('tab.product-list');
	  }

	  $scope.delete = function () {
	    productService.delete($scope.product);
	    $scope.products = productService.list();
	    $state.go('tab.product-list');
	  }

	  $scope.cancel = function () {
	    $state.go('tab.product-list');
	  }

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/product/select-category.html', {
      scope: $scope,
      controller: 'productController',
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
      $scope.product.category = category.name;
      $scope.product.product_category = category.id;
      $scope.categoryModal.hide();
    };

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/product/select-type.html', {
      scope: $scope,
      controller: 'productController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.typeModal = modal;
    });
    $scope.typeOpenModal = function() {
      $scope.typeModal.show();
    };
    $scope.typeCloseModal = function() {
      $scope.typeModal.hide();
    };
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.typeModal.remove();
    });

    $scope.selectType = function(type) {
      $scope.product.type = type.name;
      $scope.product.product_type = type.id;
      $scope.typeModal.hide();
    };

    $scope.takePicture = function() {
    var options = {
        quality : 100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var product_id = $scope.product.id
      $scope.product.picture = imageData;
      productService.update($scope.product);
      $location.path('/tab/product-detail/' + product_id);
    }, function(error) {
          alert(JSON.stringify(err));
    });
   }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.products = productService.list();
	  })

	}
]);
