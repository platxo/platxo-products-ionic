var productControllers = angular.module('productControllers', []);

productControllers.controller('productListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$cordovaBarcodeScanner',
  '$timeout',
  'productService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $cordovaBarcodeScanner,
    $timeout,
    productService

  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    productService.list()
      .$promise
        .then(function (res) {
           $scope.products = res
           $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
        })
        $timeout(function() {
             $ionicLoading.hide();
          }, 2000);
      })

    $scope.refresh = function () {
      productService.list()
        .$promise
          .then(function (res) {
             $scope.products = res
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
	    $scope.products = productService.list();
	  })

	}
]);

productControllers.controller('productDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'productService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    productService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    productService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.product = res
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

productControllers.controller('productCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'productService',
  'locationService',
  'brandService',
  'sectionService',
  'categoryService',
  'typeService',
  function(
    $scope,
    $rootScope,
    $state,
    $ionicLoading,
    $ionicModal,
    productService,
    locationService,
    brandService,
    sectionService,
    categoryService,
    typeService
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
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
	  		})
      })

    sectionService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.sections = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
	  		})
      })

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

    categoryService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.categories = res;
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
        })
      })

    typeService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.types = res;
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
        })
      })

    $scope.product = {}

	  $scope.create = function () {
      $scope.product.business = $rootScope.currentBusiness.id;
      $scope.product.employee = $rootScope.currentEmployee.id;
	    productService.create($scope.product)
        .$promise
          .then(function (res) {
      	    $state.go('tab.product-list');
          }, function (err) {

          })
	  }

    $scope.selectLocation= function(location) {
      $scope.product.location_name = location.name;
      $scope.product.location = location.id;
      $scope.locationModal.hide();
    };

    //Modal select location
    $ionicModal.fromTemplateUrl('templates/product/select-location.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
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

    $scope.selectSection= function(section) {
      $scope.product.section_name = section.name;
      $scope.product.section = section.id;
      $scope.sectionModal.hide();
    };

    //Modal select section
    $ionicModal.fromTemplateUrl('templates/product/select-section.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.sectionModal = modal;
    });
    $scope.sectionOpenModal = function() {
      $scope.sectionModal.show();
    };
    $scope.sectionCloseModal = function() {
      $scope.sectionModal.hide();
    };

    $scope.selectBrand = function(brand) {
      $scope.product.brand_name = brand.name;
      $scope.product.brand = brand.id;
      $scope.brandModal.hide();
    };

    //Modal select brand
    $ionicModal.fromTemplateUrl('templates/product/select-brand.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.brandModal = modal;
    });
    $scope.brandOpenModal = function() {
      $scope.brandModal.show();
    };
    $scope.brandCloseModal = function() {
      $scope.brandModal.hide();
    };

    $scope.selectCategory = function(category) {
      $scope.product.category_name = category.name;
      $scope.product.product_category = category.id;
      $scope.categoryModal.hide();
    };

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/product/select-category.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
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

    $scope.selectType = function(type) {
      $scope.product.type_name = type.name;
      $scope.product.product_type = type.id;
      $scope.typeModal.hide();
    };

    //Modal select type
    $ionicModal.fromTemplateUrl('templates/product/select-type.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
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

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

	}
]);

productControllers.controller('productUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicModal',
  '$cordovaCamera',
  'productService',
  'categoryService',
  'typeService',
  function(
    $scope,
    $stateParams,
    $state,
    $location,
    $ionicLoading,
    $ionicModal,
    $cordovaCamera,
    productService,
    categoryService,
    typeService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    categoryService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.categories = res;
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
        })
      })

    typeService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.types = res;
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
        })
      })

    productService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.product = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.update = function () {
	    productService.update($scope.product)
        .$promise
          .then(function (res) {
      	    $scope.products = productService.list();
      	    $state.go('tab.product-list');
          }, function (error) {

          })
	  }

    $scope.selectLocation= function(location) {
      $scope.product.location_name = location.name;
      $scope.product.location = location.id;
      $scope.locationModal.hide();
    };

    //Modal select location
    $ionicModal.fromTemplateUrl('templates/product/select-location.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
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

    $scope.selectSection= function(section) {
      $scope.product.section_name = section.name;
      $scope.product.section = section.id;
      $scope.sectionModal.hide();
    };

    //Modal select section
    $ionicModal.fromTemplateUrl('templates/product/select-section.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.sectionModal = modal;
    });
    $scope.sectionOpenModal = function() {
      $scope.sectionModal.show();
    };
    $scope.sectionCloseModal = function() {
      $scope.sectionModal.hide();
    };

    $scope.selectCategory = function(category) {
      $scope.product.category_name = category.name;
      $scope.product.product_category = category.id;
      $scope.categoryModal.hide();
    };

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/product/select-category.html', {
      scope: $scope,
      controller: 'productUpdateCtrl',
      animation: 'slide-in-up',
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

    $scope.selectType = function(type) {
      $scope.product.type_name = type.name;
      $scope.product.product_type = type.id;
      $scope.typeModal.hide();
    };

    //Modal select type
    $ionicModal.fromTemplateUrl('templates/product/select-type.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
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
      productService.update($scope.product)
        .$promise
          .then(function (res) {
            $state.go('tab.product-detail', {'id':$scope.product.id});
          }, function (err) {

          })
    }, function(err) {
          alert(JSON.stringify(err));
    });
    }

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

	}
]);

productControllers.controller('productDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'productService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    productService
  )
  {
    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
      noBackdrop: true
    });

    productService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.product = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Network Error',
            scope: $scope
          })
        });

    $scope.delete = function () {
	    productService.delete($scope.product)
        .$promise
          .then(function (res) {
      	    $scope.products = productService.list()
      	    $state.go('tab.product-list');
          }, function (err) {

          })
	  }

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

	}
]);
