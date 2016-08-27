var authServices = angular.module('authServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var signupUrl = '/api/users';
var loginUrl = '/api-auth/login';

authServices.service('signupService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + signupUrl +':id/?format=json', {id: '@id'},{
    create: { method: 'POST' },
    update: { method: 'PUT' }
  })
}])

authServices.service('loginService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + loginUrl +':id/?format=json', {id: '@id'},{
    create: { method: 'POST' },
    update: { method: 'PUT' }
  })
}])
