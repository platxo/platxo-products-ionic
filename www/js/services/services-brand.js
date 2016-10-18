var brandServices = angular.module('brandServices', ['ngResource']);

brandServices.service('brandService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var brandUrl = '/api/brands/';
  return $resource($rootScope.version + $rootScope.baseUrl + brandUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
