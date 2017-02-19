familyPortalApp.controller('viewImageCtrl', ['$scope', 'viewImageSvc', 'notificationService', function($scope, viewImageSvc, notificationService) {
    'use strict';
	
	var view = $scope;
	
	view.imageMetaDataInfo;
	view.imageMetaDataInfoLoading = true;
	
	view.init = function (imageId) {
		getImageMetaDataInfo(imageId);
	};
	
	function getImageMetaDataInfo(imageId) {
		viewImageSvc.getImageMetaDataById(imageId).then(function (resp) {
            view.imageMetaDataInfo = resp.imageInfo;
			view.imageMetaDataInfoLoading = false;
        }, function () {
            notificationService.error('Error: viewImageSvc.getImageMetaDataById(imageId)');
        });
	}
}]);