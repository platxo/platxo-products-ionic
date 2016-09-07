var typeServices = angular.module('typeServices', ['ngResource']);

var typesUrl = '/api/product-types/';

typeServices.service('typeService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + typesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
