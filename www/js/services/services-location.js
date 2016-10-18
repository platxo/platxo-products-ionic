var locationServices = angular.module('locationServices', ['ngResource']);

locationServices.service('locationService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var locationUrl = '/api/locations/';
  return $resource($rootScope.version + $rootScope.baseUrl + locationUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
