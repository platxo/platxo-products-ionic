var authServices = angular.module('authServices', ['ngResource']);

var signupUrl = '/api/users';
var loginUrl = '/api-token-auth/';

authServices.service('signupService', [ '$resource', function ($resource) {
  return $resource($rootScope.version + $rootScope.baseUrl + signupUrl +':id/?format=json', {},{
    create: { method: 'POST' }
  })
}])

authServices.service('loginService', [ '$resource', function ($resource) {
  return $resource($rootScope.version + $rootScope.baseUrl + loginUrl +':id/?format=json', {},{
    create: { method: 'POST' }
  })
}])
