var productsDirectives = angular.module('productsDirectives', []);

productsDirectives.directive('menuDirective',[
  '$ionicPopover',
  function(
    $ionicPopover
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<button ng-click="openMenu($event)" class="button icon ion-android-more-vertical"></button>',
        link:function($scope, $element, $attrs){

          $ionicPopover.fromTemplateUrl('templates/partials/menu.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });

          $scope.openMenu = function($event) {
            $scope.popover.show($event);
          };

          $scope.closeMenu = function() {
            $scope.popover.hide();
          };


        }
    };
  }
]);

productsDirectives.directive('searchDirective', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/search.html'
  }
})

productsDirectives.directive('expiredDirective', [ '$ionicPopup', '$rootScope', '$state', function ($ionicPopup, $rootScope, $state) {
  return {
    restrict: 'E',
    controller: function ($scope) {
      $scope.showAlertExpired = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Expired Session!',
          template: 'Login Please'
        });

        alertPopup.then(function(res) {
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('user');
          window.localStorage.removeItem('business');
          $scope.user = {}
          $state.go('login');
          // $scope.logout()
          // $location.path('/login');
        })
      }
    }
  }
}])
