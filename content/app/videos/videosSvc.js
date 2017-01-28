familyPortalApp.factory('videosSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getVideos = function () {
		var deffered = $q.defer();
		
        portalApiSvc.Get('/api/data/videos').get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	return service;
});