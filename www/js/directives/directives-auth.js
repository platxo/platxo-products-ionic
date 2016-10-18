var authDirectives = angular.module('authDirectives', []);

authDirectives.directive('logoutDirective',[
  '$state',
  function(
    $state
  )
  {
    return {
        restrict:'E',
        replace: true,
        template: '<ion-item on-touch="logout()" ng-click="popover.hide()"><i class="icon ion-power"></i> Logout</ion-item>',
        link:function($scope, $element, $attrs){

          $scope.logout = function() {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('business');
            $scope.user = {}
            $state.go('login');
          };

        }
    };
  }
]);
