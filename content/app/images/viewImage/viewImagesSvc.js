familyPortalApp.factory('viewImagesSvc', ['$location', 'imagesMetadataSvc', 'imagesThumbnailSvc', 'imagesSvc', 'notificationService', function ($location, imagesMetadataSvc, imagesThumbnailSvc, imagesSvc, notificationService) {
    'use strict';

    var service = {};

	service.deleteImageMetaData = function(imageId) {
		imagesMetadataSvc.deleteImageMetaDataById(imageId).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else {
				$location.url($location.path());
				$location.path('/images');
				notificationService.success('Image Successfully Deleted');
			}
        }, function () {
            notificationService.error('Error: imagesMetadataSvc.deleteImageById(imageId, fullFileName)');
        });
	};
	
	service.deleteImageThumbnail = function(imageId, imageMetaDataInfo_Original) {
		var fullFileName =  imageMetaDataInfo_Original.fileLocation + imageMetaDataInfo_Original.fileName + '.thumbnail' + imageMetaDataInfo_Original.fileExt;
		
		imagesThumbnailSvc.deleteImageThumbnail(imageId, fullFileName).then(function (resp) {
			if (resp.err)
				notificationService.info(resp.value);
        }, function () {
            notificationService.error('Error: imagesThumbnailSvc.deleteImageThumbnail(imageId, fullFileName)');
        });
	};
	
	service.deleteImage = function(imageId, imageMetaDataInfo_Original) {
		var fullFileName =  imageMetaDataInfo_Original.fileLocation + imageMetaDataInfo_Original.fileName + imageMetaDataInfo_Original.fileExt;
		
		imagesSvc.deleteImage(imageId, fullFileName).then(function (resp) {
			if (resp.err)
				notificationService.info(resp.value);
        }, function () {
            notificationService.error('Error: viewImagesSvc.deleteImage(imageId, fullFileName)');
        });
	};

	return service;
}]);