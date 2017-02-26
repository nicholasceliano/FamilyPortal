familyPortalApp.controller('viewImagesCtrl', ['$scope', '$cookies', 'viewImagesSvc', 'imagesSvc', 'notificationService', function($scope, $cookies, viewImagesSvc, imagesSvc, notificationService) {
    'use strict';
	
	var view = $scope;
	
	view.currentUserId = $cookies.get('userId');
	
	view.imageMetaDataInfo = undefined;
	view.imageMetaDataInfo_Original = undefined;
	view.imageMetaDataInfoLoading = true;
	
	view.saving = false;
	view.editMode = false;
	
	view.init = function (imageId) {
		getImageMetaDataInfo(imageId);
	};
	
	view.editMetaDataInfoToggle = function () {
		view.editMode = (view.editMode ? false : true);
	};
	
	view.saveMetaDataInfo = function () {
		updateImageFileName(view.imageMetaDataInfo, view.imageMetaDataInfo_Original);
		updateThumbnailFileName(view.imageMetaDataInfo, view.imageMetaDataInfo_Original);
		saveMetaDataInfo(view.imageMetaDataInfo, view.imageMetaDataInfo_Original);
	};
	
	view.deleteImage = function () {
		var r = confirm("Are you sure you want to perminantly delete this image?");
		if (r === true) {
			deleteImage(view.imageMetaDataInfo._id, view.imageMetaDataInfo_Original);
		}
	};
	
	function deleteImage(imageId, imageMetaDataInfo_Original) {
		var fullFileName =  imageMetaDataInfo_Original.fileLocation + imageMetaDataInfo_Original.fileName + imageMetaDataInfo_Original.fileExt;
		
		viewImagesSvc.deleteImageById(imageId, fullFileName).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else 
				window.location.href = encodeURI('/images?msg=Image Successfully Deleted');
        }, function () {
            notificationService.error('Error: viewImagesSvc.deleteImageById(imageId, fullFileName)');
        });
	}
	
	function updateImageFileName (imageMetaDataInfo, imageMetaDataInfo_Original) {
		var postData = {
			fileName: imageMetaDataInfo.fileName,
			fileExt: imageMetaDataInfo.fileExt,
			fileLoc: imageMetaDataInfo.fileLocation,
			fileName_Original: imageMetaDataInfo_Original.fileName,
			fileExt_Original: imageMetaDataInfo_Original.fileExt,
			fileLoc_Original: imageMetaDataInfo_Original.fileLocation
		};
		
		imagesSvc.updateImage(postData).then(function (resp) {
        }, function () {
            notificationService.error('Error: imagesSvc.updateImage(postData)');
        });
	}
	
	function updateThumbnailFileName (imageMetaDataInfo, imageMetaDataInfo_Original) {
		var postData = {
			fileName: imageMetaDataInfo.fileName,
			fileExt: imageMetaDataInfo.fileExt,
			fileLoc: imageMetaDataInfo.fileLocation,
			fileName_Original: imageMetaDataInfo_Original.fileName,
			fileExt_Original: imageMetaDataInfo_Original.fileExt,
			fileLoc_Original: imageMetaDataInfo_Original.fileLocation
		};
		
		imagesSvc.updateImageThumbnail(postData).then(function (resp) {
        }, function () {
            notificationService.error('Error: imagesSvc.updateImageThumbnail(postData)');
        });
	}
	
	function saveMetaDataInfo(imageMetaDataInfo, imageMetaDataInfo_Original) {
		view.saving = true;
		
		var postData = {
			name: imageMetaDataInfo.name,
			tags: $.unique(imageMetaDataInfo.tags.toString().split(',').map(function(item) { return item.trim(); })),
			fileExt: imageMetaDataInfo.fileExt,
			fileName: imageMetaDataInfo.fileName,
			fileName_Original: imageMetaDataInfo_Original.fileName
		};
		
		viewImagesSvc.saveMetaDataInfoById(imageMetaDataInfo._id, postData).then(function (resp) {
			if(resp.err){
				notificationService.err(resp.value);
			} else {
				view.imageMetaDataInfo = resp.value;
				view.imageMetaDataInfo_Original = angular.copy(view.imageMetaDataInfo);
				
				notificationService.success('Image Meta Data Info Updated Successfully');
			}
			
			view.saving = false;
			view.editMode = false;
        }, function () {
			view.saving = false;
			view.editMode = false;
            notificationService.error('Error: viewImagesSvc.saveMetaDataInfoById(imageMetaDataInfo._id, postData)');
        });
	}
	
	function getImageMetaDataInfo(imageId) {
		viewImagesSvc.getImageMetaDataById(imageId).then(function (resp) {
            if(resp.err){
				notificationService.error(resp.value);	
			} else {
				view.imageMetaDataInfo = resp.value;
				view.imageMetaDataInfo_Original = angular.copy(view.imageMetaDataInfo);
			}
			
			view.imageMetaDataInfoLoading = false;
        }, function () {
            notificationService.error('Error: viewImagesSvc.getImageMetaDataById(imageId)');
        });
	}
}]);