var productServices = angular.module('productServices', ['ngResource']);

productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var productUrl = '/api/products/';
  return $resource($rootScope.version + $rootScope.baseUrl + productUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);

productServices.service('taxService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var taxUrl = '/api/taxes/';
  return $resource($rootScope.version + $rootScope.baseUrl + taxUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET' },
  });
}]);
