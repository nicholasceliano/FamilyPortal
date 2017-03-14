familyPortalApp.factory('userActivitySvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};
	
	service.getRecentUserActivity = function (ct, start) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/userActivity', { ct: ct, start: start }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.getRecentUserActivityById = function (id, ct, start) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/userActivity/:id', { id: id, ct: ct, start: start }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	return service;
}]);