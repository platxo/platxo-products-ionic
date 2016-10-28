var typeControllers = angular.module('typeControllers', []);

typeControllers.controller('typeListCtrl', [
  '$scope',
  '$state',
  '$location',
  '$ionicLoading',
  '$ionicActionSheet',
  '$ionicTabsDelegate',
  '$cordovaBarcodeScanner',
  'typeService',
  function(
    $scope,
    $state,
    $location,
    $ionicLoading,
    $ionicActionSheet,
    $ionicTabsDelegate,
    $cordovaBarcodeScanner,
    typeService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  typeService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.types = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
          if (err.data.detail === "Signature has expired.") {
            $scope.showAlertExpired()
          }
        })

      $scope.refresh = function () {
        typeService.list()
    	  	.$promise
    	  		.then(function (res) {
    	  			$scope.types = res
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

    $scope.showActionsheet = function(type) {
      $ionicActionSheet.show({
        buttons: [
          { text: 'Update <i class="icon ion-edit"></i>' },
          { text: 'Delete <i class="icon ion-android-delete"></i>' },
        ],
        buttonClicked: function(index) {
          if (index == 0) {
            $state.go('tab.type-update', {id:type.id});
          } else {
            $state.go('tab.type-delete', {id:type.id});
          }
          return true;
        },
      });
    };

	  $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'tab.type-list') {
        typeService.list()
    	  	.$promise
    	  		.then(function (res) {
    	  			$scope.types = res
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

typeControllers.controller('typeDetailCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  '$state',
  'typeService',
  function(
    $scope,
    $stateParams,
    $ionicLoading,
    $state,
    typeService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    typeService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.type = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

	}
]);

typeControllers.controller('typeCreateCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  '$ionicModal',
  'typeService',
  'categoryService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $ionicLoading,
    $ionicModal,
    typeService,
    categoryService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  categoryService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.categories = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
        })

	  $scope.type = {}

	  $scope.create = function () {
      $scope.type.business = $rootScope.currentBusiness.id;
      $scope.type.employee = $rootScope.currentEmployee.id;
	    typeService.create($scope.type)
        .$promise
          .then(function (res) {
      	    $state.go('tab.type-list');
          }, function (err) {

          })
	  }

    $scope.selectCategory = function(category) {
      $scope.type.category_name = category.name;
      $scope.type.product_category = category.id
      $scope.categoryModal.hide();
    };

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/type/select-category.html', {
      scope: $scope,
      controller: 'typeCreateCtrl',
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

    $scope.cancel = function () {
	    $state.go('tab.type-list');
	  }

	}
]);

typeControllers.controller('typeUpdateCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicModal',
  '$ionicLoading',
  'typeService',
  'categoryService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicModal,
    $ionicLoading,
    typeService,
    categoryService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

	  categoryService.list()
	  	.$promise
	  		.then(function (res) {
	  			$scope.categories = res
          $ionicLoading.hide();
	  		}, function (err) {
          $ionicLoading.hide();
        })

    typeService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.type = res
          $scope.type.category_name = $scope.type.product_category_name;
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });

    $scope.update = function () {
	    typeService.update($scope.type)
        .$promise
          .then(function (res) {
      	    $state.go('tab.type-list');
          }, function (err) {

          })
	  }

    $scope.selectCategory = function(category) {
      $scope.type.category_name = category.name;
      $scope.type.product_category = category.id
      $scope.categoryModal.hide();
    };

    //Modal select category
    $ionicModal.fromTemplateUrl('templates/type/select-category.html', {
      scope: $scope,
      controller: 'typeUpdateCtrl',
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

    $scope.cancel = function () {
	    $state.go('tab.type-list');
	  }

	}
]);

typeControllers.controller('typeDeleteCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicLoading',
  'typeService',
  function(
    $scope,
    $stateParams,
    $state,
    $ionicLoading,
    typeService
  )
  {
    $ionicLoading.show({
    template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
    noBackdrop: true
    });

    typeService.detail({id: $stateParams.id})
      .$promise
        .then(function (res) {
          $scope.type = res
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
        });


    $scope.delete = function () {
	    typeService.delete($scope.type)
        .$promise
          .then(function (res) {
      	    $state.go('tab.type-list');
          }, function (err) {

          })
	  }

    $scope.cancel = function () {
	    $state.go('tab.type-list');
	  }

	}
]);
