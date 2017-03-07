familyPortalApp.factory('viewImagesSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getImageMetaDataById = function (imageId) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/imageMetadata/:id', { id: imageId }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.insertImageMetaData = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/imageMetadata').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.saveMetaDataInfoById = function (imageId, postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/imageMetadata/:id').save({ id: imageId }, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.deleteImageMetaDataById = function (imageId) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/imageMetadata/:id').delete({ id: imageId },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };

	return service;
}]);