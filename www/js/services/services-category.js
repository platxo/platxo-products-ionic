var categoryServices = angular.module('categoryServices', ['ngResource']);

categoryServices.service('categoryService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var categoriesUrl = '/api/product-categories/';
  return $resource($rootScope.version + $rootScope.baseUrl + categoriesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
		detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
