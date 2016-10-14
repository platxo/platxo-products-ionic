var productControllers = angular.module('productControllers', []);

productControllers.controller('productController', [
  '$scope',
  '$stateParams',
  '$state',
  '$location',
  'productService',
  'categoryService',
  'typeService',
  '$ionicModal',
  '$rootScope',
  '$cordovaCamera',
  '$cordovaBarcodeScanner',
  function(
    $scope,
    $stateParams,
    $state,
    $location,
    productService,
    categoryService,
    typeService,
    $ionicModal,
    $rootScope,
    $cordovaCamera,
    $cordovaBarcodeScanner
  )
  {
    $scope.product = {}

    productService.list()
      .$promise
        .then(function (res) {
           $scope.products = res;
        }, function (error) {

        })
    categoryService.list()
      .$promise
        .then(function (res) {
           $scope.categories = res;
        }, function (error) {

        })
    typeService.list()
      .$promise
        .then(function (res) {
           $scope.types = res;
        }, function (error) {

        })

	  $scope.create = function () {
      $scope.product.business = $rootScope.currentBusiness;
      $scope.product.employee = $rootScope.currentEmployee.id;
	    productService.create($scope.product)
        .$promise
          .then(function (res) {
      	    $scope.products = productService.list();
      	    $state.go('tab.product-list');
          }, function (error) {

          })
	  }

	  $scope.update = function () {
	    productService.update($scope.product)
        .$promise
          .then(function (res) {
      	    $scope.products = productService.list();
      	    $state.go('tab.product-list');
          }, function (error) {

          })
	  }

	  $scope.delete = function () {
	    productService.delete($scope.product)
        .$promise
          .then(function (res) {
      	    $scope.products = productService.list()
      	    $state.go('tab.product-list');
          }, function (error) {

          })
	  }

	  $scope.cancel = function () {
	    $state.go('tab.product-list');
	  }

    $scope.detail = function (product) {
      $rootScope.selectedProduct = product;
      $state.go('tab.product-detail', { 'id': product.id });
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

    //Modal select type
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
      $scope.product.picture = "data:image/jpeg;base64," + imageData;
      businessService.update($scope.product)
        .$promise
          .then(function (res) {
            $state.go('tab.product-detail', {'id':$scope.product.id});
          }, function (err) {

          })
    }, function(err) {
          alert(JSON.stringify(err));
    });
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
	    $scope.products = productService.list();
	  })

	}
]);
