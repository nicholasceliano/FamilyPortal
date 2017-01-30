familyPortalApp.factory('headerSvc', function () {
    'use strict';

    var service = {};
	
	service.isActiveNavItem = function(route, pathName) {
		return (route.indexOf(pathName) !== -1 && pathName !== '/' || route == pathName);
	}
	
	return service;
});