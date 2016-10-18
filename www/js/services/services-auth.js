var authServices = angular.module('authServices', ['ngResource']);

authServices.service('signupService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var signupUrl = '/api/users/';
  return $resource($rootScope.version + $rootScope.baseUrl + signupUrl +':id/?format=json', {id: '@id'},{
    signup: { method: 'POST' },
    update: { method: 'PUT', headers: $rootScope.headersJWT }
  });
}]);

authServices.service('loginService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var loginUrl = '/api-token-auth/';
  return $resource($rootScope.version + $rootScope.baseUrl + loginUrl +'?format=json', {},{
    login: { method: 'POST' }
  });
}]);

authServices.service('forgotPasswordService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var forgotPasswordUrl = '/api/forgot-password/';
  return $resource($rootScope.version + $rootScope.baseUrl + forgotPasswordUrl +'?format=json', {},{
    send: { method: 'POST' }
  });
}]);

authServices.service('validateService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var validateUrl = '/api/forgot-password-validate/';
  return $resource($rootScope.version + $rootScope.baseUrl + validateUrl +'?format=json', {},{
    send: { method: 'POST' }
  });
}]);

authServices.service('resetPasswordService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var resetPasswordUrl = '/api/reset-password/';
  return $resource($rootScope.version + $rootScope.baseUrl + resetPasswordUrl +'?format=json', {},{
    send: { method: 'POST' }
  });
}]);
