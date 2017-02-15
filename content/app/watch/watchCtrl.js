familyPortalApp.controller('watchCtrl', ['$scope', 'watchSvc', 'notificationService', function($scope, watchSvc, notificationService) {
    'use strict';
	
	var watch = $scope;
	
	watch.videoInfo;
	watch.videoInfoLoading = true;
	
	watch.init = function (videoId) {
		getVideoInfo(videoId);
	};

	function getVideoInfo(videoId) {
		 watchSvc.getVideoById(videoId).then(function (resp) {
            watch.videoInfo = resp.video;
			watch.videoInfoLoading = false;
        }, function () {
            notificationService.error('Error: watchSvc.getVideoById(videoId)');
        });
	};
}]);