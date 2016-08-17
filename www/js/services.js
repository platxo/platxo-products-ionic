var productsServices = angular.module('productsServices', ['ngResource']);

var baseUrl = 'http://platxo.com';
var productsURL = '/api/products/';

productsServices.service('productService', [ '$resource', function ($resource) {
  return $resource(baseUrl + productsURL +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);