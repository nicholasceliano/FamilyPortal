familyPortalApp.factory('videosSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls	
	service.getVideos = function (ct, start) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/videos', { ct: ct, start: start }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.getVideoById = function (id) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/videos/:id', { id: id }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	return service;
}]);