familyPortalApp.factory('splashSvc', ['$q', 'portalApiSvc', 'msToTimeDiffFilter', function ($q, portalApiSvc, msToTimeDiffFilter) {
    'use strict';

    var service = {};
	
	service.calculateDayDiff = function (array, suffix) {
		
		$(array).each(function(i, v) {
			var currDate = new Date().getTime();
			var createDate = new Date(v.createDate).getTime();
			var dateDiff = (currDate - createDate);
			
			v.dateDiff = msToTimeDiffFilter(dateDiff, suffix);
		});		
		
		return array;
	};
	
	service.getRecentUserActivity = function (ct) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/userActivity', { ct: ct }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	return service;
}]);