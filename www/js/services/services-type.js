var typeServices = angular.module('typeServices', ['ngResource']);

typeServices.service('typeService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var typesUrl = '/api/product-types/';
  return $resource($rootScope.version + $rootScope.baseUrl + typesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
