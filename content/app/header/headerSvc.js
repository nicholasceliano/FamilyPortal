familyPortalApp.factory('headerSvc', function () {
    'use strict';

    var service = {};
	
	service.isActiveNavItem = function(route, pathName) {
		return (route.indexOf(pathName) !== -1 && pathName !== '/' || route == pathName);
	};
	
	service.buildBreadcrumbItem = function(route, currentRoute) {
		var breadcrumbVal = 'home';
		
		if (route.length > 0)
			breadcrumbVal = route;
		
		if (currentRoute)
			return '<li>' + breadcrumbVal + '</li>';
		else
			return '<li><a href="/' + route + '">' + breadcrumbVal + '</a></li>';
	};
	
	return service;
});