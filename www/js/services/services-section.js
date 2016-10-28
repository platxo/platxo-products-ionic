var sectionServices = angular.module('sectionServices', ['ngResource']);

sectionServices.service('sectionService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var sectionUrl = '/api/sections/';
  return $resource($rootScope.version + $rootScope.baseUrl + sectionUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
