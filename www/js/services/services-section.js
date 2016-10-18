var sectionServices = angular.module('sectionServices', ['ngResource']);

sectionServices.service('sectionService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var sectionUrl = '/api/sections/';
  return $resource($rootScope.version + $rootScope.baseUrl + sectionUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
