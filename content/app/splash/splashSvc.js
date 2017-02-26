familyPortalApp.factory('splashSvc', ['$q', 'msToTimeDiffFilter', function ($q, msToTimeDiffFilter) {
    'use strict';

    var service = {};
	
	service.calculateDayDiff = function (array) {
		
		$(array).each(function(i, v) {
			var currDate = new Date().getTime();
			var createDate = new Date(v.createDate).getTime();
			var dateDiff = (currDate - createDate);
			
			v.dateDiff = msToTimeDiffFilter(dateDiff);
		});		
		
		return array;
	};
	
	return service;
}]);