var productServices = angular.module('productServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var productsUrl = '/api/products/';

productServices.service('productService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + productsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
