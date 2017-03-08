familyPortalApp.factory('imagesThumbnailSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};
	
	service.saveImageThumbnail = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/v1/images/thumbnail').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.updateImageThumbnail = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id/thumbnail').save({ id: postData.id }, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.deleteImageThumbnail = function (imageId, fullFileName) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id/thumbnail').delete({ id: imageId, fileName: fullFileName },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};

	return service;
}]);