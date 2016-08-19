var productsServices = angular.module('productsServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var productsUrl = '/api/products/';
var categoriesUrl = '/api/categories/';
var typesUrl = '/api/types/';

productsServices.service('productService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + productsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);

productsServices.service('categoryService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + categoriesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);

productsServices.service('typeService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + typesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
