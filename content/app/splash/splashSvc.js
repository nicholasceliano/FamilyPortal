familyPortalApp.factory('splashSvc', ['$q', 'msToTimeDiffFilter', function ($q, msToTimeDiffFilter) {
    'use strict';

    var service = {};
	
	service.calculateDayDiff = function (videos) {
		
		$(videos).each(function(i, v) {
			var currDate = new Date().getTime();
			var videoDate = new Date(v.createDate).getTime();
			var dateDiff = (currDate - videoDate);
			
			v.dateDiff = msToTimeDiffFilter(dateDiff);
		});		
		
		return videos;
	}
	
	return service;
}]);