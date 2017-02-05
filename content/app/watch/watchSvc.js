familyPortalApp.factory('watchSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getVideoById = function (id) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/video', { id: id }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	return service;
});