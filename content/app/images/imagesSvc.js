familyPortalApp.factory('imagesSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getImageMetaData = function (imgCt, start, searchTerm, folderPath) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/images/metadata', { ct: imgCt, start: start, searchTerm: searchTerm, folderPath: folderPath }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveImage = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/images').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.updateImage = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/images').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.saveImageThumbnail = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/images/thumbnail').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.updateImageThumbnail = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/images/thumbnail').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.saveFolder = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/images/folder').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.getFolders = function (folderPath) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/images/folder').get({ folderPath: folderPath },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};

	return service;
}]);