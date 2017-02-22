familyPortalApp.controller('viewImagesCtrl', ['$scope', '$cookies', 'viewImagesSvc', 'notificationService', function($scope, $cookies, viewImagesSvc, notificationService) {
    'use strict';
	
	var view = $scope;
	
	view.currentUserId = $cookies.get('userId');
	
	view.imageMetaDataInfo;
	view.imageMetaDataInfo_Original;
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
		saveMetaDataInfo(view.imageMetaDataInfo, view.imageMetaDataInfo_Original);
	};
	
	view.deleteImage = function () {
		var r = confirm("Are you sure you want to perminantly delete this image?");
		if (r == true) {
			deleteImage(view.imageMetaDataInfo._id, view.imageMetaDataInfo_Original);
		}
	};
	
	function deleteImage(imageId, imageMetaDataInfo_Original) {
		var fullFileName = imageMetaDataInfo_Original.fileName + imageMetaDataInfo_Original.fileExt;
		
		viewImagesSvc.deleteImageById(imageId, fullFileName).then(function (resp) {
			window.location.href = encodeURI('/images?msg=Image Successfully Deleted');
        }, function () {
            notificationService.error('Error: viewImagesSvc.deleteImageById(imageId, fullFileName)');
        });
	}
	
	function saveMetaDataInfo(imageMetaDataInfo, imageMetaDataInfo_Original) {
		view.saving = true;
		
		var postData = {
			name: imageMetaDataInfo.name,
			tags: imageMetaDataInfo.tags,
			fileExt: imageMetaDataInfo.fileExt,
			fileName: imageMetaDataInfo.fileName,
			fileName_Original: imageMetaDataInfo_Original.fileName
		};
		
		viewImagesSvc.saveMetaDataInfoById(imageMetaDataInfo._id, postData).then(function (resp) {
			view.imageMetaDataInfo = resp.imageInfo;
			view.imageMetaDataInfo_Original = angular.copy(view.imageMetaDataInfo);
			
			view.saving = false;
			view.editMode = false;
			notificationService.success('Image Meta Data Info Updated Successfully');
        }, function () {
			view.saving = false;
			view.editMode = false;
            notificationService.error('Error: viewImagesSvc.saveMetaDataInfoById(imageMetaDataInfo._id, postData)');
        });
	}
	
	function getImageMetaDataInfo(imageId) {
		viewImagesSvc.getImageMetaDataById(imageId).then(function (resp) {
            view.imageMetaDataInfo = resp.imageInfo;
			view.imageMetaDataInfo_Original = angular.copy(view.imageMetaDataInfo);
			view.imageMetaDataInfoLoading = false;
        }, function () {
            notificationService.error('Error: viewImagesSvc.getImageMetaDataById(imageId)');
        });
	}
}]);