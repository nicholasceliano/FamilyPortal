familyPortalApp.factory('pagingSvc', function () {
    'use strict';

    var service = {};
	
	service.getNextPageCt = function (pagingCt, startItem, totalRecords) {
		if ((startItem + pagingCt) > totalRecords) {
			var tempCt = totalRecords - startItem;
			return tempCt;
		} else {
			return pagingCt;
		}
	};
	
	return service;
});