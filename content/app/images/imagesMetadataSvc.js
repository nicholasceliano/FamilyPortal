familyPortalApp.factory('imagesMetadataSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};
	
    //API Calls
    service.getImageMetaData = function (imgCt, start, searchTerm, folderPath) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/metadata', { ct: imgCt, start: start, searchTerm: searchTerm, folderPath: folderPath }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.getImageMetaDataById = function (imageId) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id/metadata', { id: imageId }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.insertImageMetaData = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/metadata').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.saveMetaDataInfoById = function (imageId, postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id/metadata').save({ id: imageId }, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.deleteImageMetaDataById = function (imageId) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id/metadata').delete({ id: imageId },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };

	return service;
}]);