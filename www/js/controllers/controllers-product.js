var productControllers = angular.module('productControllers', []);

productControllers.controller('productListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicTabsDelegate',
  '$ionicActionSheet',
  '$cordovaBarcodeScanner',
  'productService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $ionicTabsDelegate,
    $ionicActionSheet,
    $cordovaBarcodeScanner,
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
          if (err.data.detail === "Signature has expired.") {
            $scope.showAlertExpired()
          }
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
            if (err.data.detail === "Signature has expired.") {
              $scope.showAlertExpired()
            }
          })
    }

    $scope.loadMore = function() {
      productService.list()
        .$promise
          .then(function (res) {
            $scope.products = res
            $ionicLoading.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, function (err) {
            $ionicLoading.hide();
            if (err.data.detail === "Signature has expired.") {
              $scope.showAlertExpired()
            }
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

    $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }

    $scope.showActionsheet = function(product) {
      $ionicActionSheet.show({
        buttons: [
          { text: 'Update <i class="icon ion-edit"></i>' },
          { text: 'Delete <i class="icon ion-android-delete"></i>' },
        ],
        buttonClicked: function(index) {
          if (index == 0) {
            $state.go('tab.product-update', {id:product.id});
          } else {
            $state.go('tab.product-delete', {id:product.id});
          }
          return true;
        },
      });
    };

	  $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'tab.product-list') {
        productService.list()
          .$promise
            .then(function (res) {
              $scope.products = res
              $ionicLoading.hide();
            }, function (err) {
              $ionicLoading.hide();
              if (err.data.detail === "Signature has expired.") {
                $scope.showAlertExpired()
              }
            })
      }
	  })

	}
]);

productControllers.controller('productDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  '$cordovaPrinter',
  'productService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    $cordovaPrinter,
    productService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    $scope.storagecode = 'https://storage.googleapis.com/platxo-bi.appspot.com/product/code';

    productService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.product = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

    $scope.print = function() {
        if($cordovaPrinter.isAvailable()) {
            $cordovaPrinter.print($scope.storagecode + '/' + $scope.product.id + '.png');
        } else {
            alert("Printing is not available on device");
        }
    }

	}
]);

productControllers.controller('productCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  '$cordovaCamera',
  'productService',
  'locationService',
  'sectionService',
  'brandService',
  'categoryService',
  'typeService',
  'taxService',
  function(
    $scope,
    $rootScope,
    $state,
    $ionicLoading,
    $ionicModal,
    $cordovaCamera,
    productService,
    locationService,
    sectionService,
    brandService,
    categoryService,
    typeService,
    taxService
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

    sectionService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.sections = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
        })

    brandService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.brands = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
        })

    categoryService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.categories = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    typeService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.types = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    taxService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.taxes = res;
        }, function (err) {
          $ionicLoading.hide();
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

    $scope.selectLocation = function(location) {
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

    $scope.selectTax = function(tax) {
      $scope.product.tax_name = tax.name;
      $scope.product.tax = tax.id;
      $scope.typeModal.hide();
    };

    //Modal select type
    $ionicModal.fromTemplateUrl('templates/product/select-tax.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.taxModal = modal;
    });
    $scope.taxOpenModal = function() {
      $scope.taxModal.show();
    };
    $scope.taxCloseModal = function() {
      $scope.taxModal.hide();
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
    }, function(err) {
          alert(JSON.stringify(err));
    });
    }

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

	}
]);

productControllers.controller('productUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  '$cordovaCamera',
  'productService',
  'locationService',
  'sectionService',
  'brandService',
  'categoryService',
  'typeService',
  'taxService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    $ionicModal,
    $cordovaCamera,
    productService,
    locationService,
    sectionService,
    brandService,
    categoryService,
    typeService,
    taxService
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

    sectionService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.sections = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
        })

    brandService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.brands = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
        })

    categoryService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.categories = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    typeService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.types = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    taxService.list()
      .$promise
        .then(function (res) {
          $ionicLoading.hide();
           $scope.taxes = res;
        }, function (err) {
          $ionicLoading.hide();
        })

    productService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.product = res
          $scope.product.category_name = $scope.product.product_category_name;
          $scope.product.type_name = $scope.product.product_type_name;
          $scope.product.location_name = $scope.product.location_name;
          $scope.product.section_name = $scope.product.section_name;
          $scope.product.brand_name = $scope.product.brand_name;
          $scope.product.tax_name = $scope.product.tax_name;
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
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

    $scope.selectTax = function(tax) {
      $scope.product.tax_name = tax.name;
      $scope.product.tax = tax.id;
      $scope.typeModal.hide();
    };

    //Modal select type
    $ionicModal.fromTemplateUrl('templates/product/select-tax.html', {
      scope: $scope,
      controller: 'productCreateCtrl',
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.taxModal = modal;
    });
    $scope.taxOpenModal = function() {
      $scope.taxModal.show();
    };
    $scope.taxCloseModal = function() {
      $scope.taxModal.hide();
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
