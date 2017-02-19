familyPortalApp.factory('viewImageSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getImageMetaDataById = function (imageId) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/image/metadata', { id: imageId }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };

	return service;
}]);