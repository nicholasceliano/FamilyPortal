familyPortalApp.factory('imagesSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

	service.buildFolderBreadcrumbs = function (folderName) {
		var breadcrumbArray = [];
		var folderArray = folderName.split('\/');
		folderArray.pop();
		
		$(folderArray).each(function(i,e) {		
			if (i === 0) {
				breadcrumbArray.push({text: 'Images', folder: '/'});
			} else {
				var folderLoc = '';
				
				$(folderArray).each(function(i2,e2) {
					if (i2 <= i)
						folderLoc = folderLoc + e2 + '/';
				});
				
				breadcrumbArray.push({text: e, folder: folderLoc});
			}
		});
		
		return breadcrumbArray;
	};
	
    //API Calls
    service.getImageMetaData = function (imgCt, start, searchTerm, folderPath) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/imageMetadata', { ct: imgCt, start: start, searchTerm: searchTerm, folderPath: folderPath }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveImage = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/v1/images').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.updateImage = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id').save({ id: postData.id }, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.deleteImage = function (imageId, fullFileName) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id').delete({ id: imageId, fileName: fullFileName },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.saveImageThumbnail = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/v1/imageThumbnail').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.updateImageThumbnail = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/imageThumbnail/:id').save({ id: postData.id }, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.deleteImageThumbnail = function (imageId, fullFileName) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/imageThumbnail/:id').delete({ id: imageId, fileName: fullFileName },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.saveFolder = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/imageFolder').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.getFolders = function (folderPath) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/imageFolder').get({ folderPath: folderPath },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};

	return service;
}]);