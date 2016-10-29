var products = angular.module('products', [
  'ionic',
  'ngCordova',
  'authControllers',
  'authServices',
  'authRoutes',
  'businessControllers',
  'businessRoutes',
  'businessServices',
  'settingControllers',
  'settingRoutes',
  'locationControllers',
  'locationServices',
  'locationRoutes',
  'sectionControllers',
  'sectionServices',
  'sectionRoutes',
  'brandControllers',
  'brandServices',
  'brandRoutes',
  'categoryControllers',
  'categoryServices',
  'categoryRoutes',
  'typeControllers',
  'typeServices',
  'typeRoutes',
  'productControllers',
  'productServices',
  'productRoutes',
  'productsDirectives'
])

products.run(function($ionicPlatform, $rootScope, $state, $ionicHistory, $http) {
  $rootScope.version = 'http://development.';
  $rootScope.baseUrl = 'platxo-bi.appspot.com';
  // $rootScope.version = 'http://localhost';
  // $rootScope.baseUrl = ':8080';
  $http.defaults.headers.common['Authorization'] = 'JWT ' + JSON.parse(localStorage.getItem("token"));
  $rootScope.currentUser = JSON.parse(localStorage.getItem("user")) || '';
  $rootScope.currentEmployee = $rootScope.currentUser.employee || '';
  $rootScope.currentBusiness = JSON.parse(localStorage.getItem("business")) || '';

  $rootScope.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('business');
    $http.defaults.headers.common['Authorization'] = undefined;
    $ionicHistory.clearCache().then(function() {
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $state.go('login');
    })
  };

  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// products.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.common['Authorization'] = 'JWT ' + JSON.parse(localStorage.getItem("token"));
// }])
