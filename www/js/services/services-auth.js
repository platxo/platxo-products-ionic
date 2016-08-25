var authServices = angular.module('authServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var productsUrl = '/api/auth/';

authServices.service('signupService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + productsUrl +':id/?format=json', {id: '@id'},{
    create: { method: 'POST' },
    update: { method: 'PUT' }
  });
}]);
