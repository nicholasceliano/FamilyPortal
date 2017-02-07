familyPortalApp.factory('videosSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getVideos = function () {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/videos').get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.getRecentVideos = function (ct) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/videos', { ct: ct }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	return service;
}]);