familyPortalApp.controller('viewImageCtrl', ['$scope', '$cookies', 'viewImageSvc', 'notificationService', function($scope, $cookies, viewImageSvc, notificationService) {
    'use strict';
	
	var view = $scope;
	
	view.currentUserId = $cookies.get('userId');
	
	view.imageMetaDataInfo;
	view.imageMetaDataInfo_Original;
	view.imageMetaDataInfoLoading = true;
	
	view.editMode = false;
	
	view.init = function (imageId) {
		getImageMetaDataInfo(imageId);
	};
	
	view.editMetaDataInfoToggle = function () {
		view.editMode = (view.editMode ? false : true);
	};
	
	view.saveMetaDataInfo = function () {
		saveMetaDataInfo(view.imageMetaDataInfo);
	};
	
	view.deleteImage = function () {
		//need to delete image
	};
	
	function saveMetaDataInfo(imagedMetaDataInfo) {
		viewImageSvc.saveMetaDataInfo(imagedMetaDataInfo._id, imagedMetaDataInfo).then(function (resp) {
			
			//set updated data to data bind
			
			view.editMode = false;
			notificationService.success('Image Meta Data Info Updated Successfully');
        }, function () {
			view.editMode = false;
            notificationService.error('Error: viewImageSvc.getImageMetaDataById(imageId)');
        });
	}
	
	function getImageMetaDataInfo(imageId) {
		viewImageSvc.getImageMetaDataById(imageId).then(function (resp) {
            view.imageMetaDataInfo = resp.imageInfo;
			view.imageMetaDataInfo_Original = angular.copy(view.imageMetaDataInfo);
			view.imageMetaDataInfoLoading = false;
        }, function () {
            notificationService.error('Error: viewImageSvc.getImageMetaDataById(imageId)');
        });
	}
}]);