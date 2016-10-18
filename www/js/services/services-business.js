var businessServices = angular.module('businessServices', ['ngResource']);

businessServices.service('businessService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var businessUrl = '/api/business/';
  return $resource($rootScope.version + $rootScope.baseUrl + businessUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT }
  });
}]);
