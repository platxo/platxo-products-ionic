var products = angular.module('products', [
  'ionic',
  'ngCordova',
  'authControllers',
  'authServices',
  'authRoutes',
  'authDirectives',
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

products.run(function($ionicPlatform, $rootScope, $location) {
  $rootScope.version = 'http://development.';
  $rootScope.baseUrl = 'platxo-bi.appspot.com';
  // $rootScope.version = 'http://localhost';
  // $rootScope.baseUrl = ':8080';
  if (localStorage.token) {
    $rootScope.token = JSON.parse(localStorage.getItem("token"));
    $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token}
  }
  //$rootScope.token = JSON.parse(localStorage.getItem("token")) || '';
  $rootScope.currentUser = JSON.parse(localStorage.getItem("user")) || '';
  $rootScope.currentBusiness = JSON.parse(localStorage.getItem("business")) || '';
  $rootScope.currentEmployee = $rootScope.currentUser.employee || '';
  //$rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token}

  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
