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
	
	return service;
}]);