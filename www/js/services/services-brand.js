var brandServices = angular.module('brandServices', ['ngResource']);

brandServices.service('brandService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var brandUrl = '/api/brands/';
  return $resource($rootScope.version + $rootScope.baseUrl + brandUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
