var inventoryServices = angular.module('inventoryServices', ['ngResource']);

var locationUrl = '/api/locations/';
var sectionUrl = '/api/sections/';

inventoryServices.service('locationService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + locationUrl +':id/?format=json', {id: '@id'},{
    create: { method: 'POST', headers: $rootScope.headersJWT },
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);

inventoryServices.service('sectionService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + sectionUrl +':id/?format=json', {id: '@id'},{
    create: { method: 'POST', headers: $rootScope.headersJWT },
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
