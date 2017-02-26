familyPortalApp.factory('arraySvc', function () {
    'use strict';

    var service = {};

	service.makeArrayUnique = function (array) {
		return  array.filter(function(itm, i, array) {
			return i == array.indexOf(itm);
		});
	};
	
	return service;
});