familyPortalApp.controller('watchCtrl', ['$scope', 'videosSvc', 'notificationService', function($scope, videosSvc, notificationService) {
    'use strict';
	
	var watch = $scope;
	
	watch.videoInfo;
	watch.videoInfoLoading = true;
	
	watch.init = function (videoId) {
		getVideoInfo(videoId);
	};

	function getVideoInfo(videoId) {
		videosSvc.getVideoById(videoId).then(function (resp) {
            watch.videoInfo = resp.videos;
			watch.videoInfoLoading = false;
        }, function () {
            notificationService.error('Error: videosSvc.getVideoById(videoId)');
        });
	};
}]);