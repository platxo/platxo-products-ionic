var categoryServices = angular.module('categoryServices', ['ngResource']);

var categoriesUrl = '/api/product-categories/';

categoryServices.service('categoryService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var headers = { 'Authorization': 'JWT ' + $rootScope.token}
  return $resource($rootScope.version + $rootScope.baseUrl + categoriesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
