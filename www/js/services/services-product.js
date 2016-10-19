var productServices = angular.module('productServices', ['ngResource']);

productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var productUrl = '/api/products/';
  return $resource($rootScope.version + $rootScope.baseUrl + productUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);

productServices.service('taxService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var taxUrl = '/api/taxes/';
  return $resource($rootScope.version + $rootScope.baseUrl + taxUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
  });
}]);
