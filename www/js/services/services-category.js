var categoryServices = angular.module('categoryServices', ['ngResource']);

categoryServices.service('categoryService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var categoriesUrl = '/api/product-categories/';
  return $resource($rootScope.version + $rootScope.baseUrl + categoriesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
		detail: { method: 'GET', headers: $rootScope.headersJWT },
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);
