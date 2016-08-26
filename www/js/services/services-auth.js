var authServices = angular.module('authServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var authUrl = '/api/auth/';

authServices.service('signupService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + authUrl +':id/?format=json', {id: '@id'},{
    create: { method: 'POST' },
    update: { method: 'PUT' }
  });
}]);
