var locationServices = angular.module('locationServices', ['ngResource']);

locationServices.service('locationService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var locationUrl = '/api/locations/';
  return $resource($rootScope.version + $rootScope.baseUrl + locationUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
