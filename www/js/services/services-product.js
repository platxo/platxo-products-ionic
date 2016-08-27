var productServices = angular.module('productServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var productsUrl = '/api/products/';

productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + productsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: { 'Authorization': 'JWT ' + $rootScope.token	}},
    detail: { method: 'GET', headers: { 'Authorization': 'JWT ' + $rootScope.token	} },
    create: { method: 'POST', headers: { 'Authorization': 'JWT ' + $rootScope.token	} },
    update: { method: 'PUT', headers: { 'Authorization': 'JWT ' + $rootScope.token	} },
    delete: { method: 'DELETE', headers: { 'Authorization': 'JWT ' + $rootScope.token	} }
  });
}]);
