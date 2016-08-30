var productServices = angular.module('productServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var productsUrl = '/api/products/';


productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var headers = { 'Authorization': 'JWT ' + $rootScope.token}
  return $resource(version + baseUrl + productsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: headers},
    detail: { method: 'GET', headers: headers },
    create: { method: 'POST', headers: headers },
    update: { method: 'PUT', headers: headers },
    delete: { method: 'DELETE', headers: headers }
  });
}]);
