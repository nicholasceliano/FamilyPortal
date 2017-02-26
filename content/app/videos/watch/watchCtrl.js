familyPortalApp.controller('watchCtrl', ['$scope', 'videosSvc', 'notificationService', function($scope, videosSvc, notificationService) {
    'use strict';
	
	var watch = $scope;
	
	watch.videoInfo = undefined;
	watch.videoInfoLoading = true;
	
	watch.init = function (videoId) {
		getVideoInfo(videoId);
	};

	function getVideoInfo(videoId) {
		videosSvc.getVideoById(videoId).then(function (resp) {
            if (resp.err)
				notificationService.error(resp.value);
			else
				watch.videoInfo = resp.value;
			
			watch.videoInfoLoading = false;
        }, function () {
            notificationService.error('Error: videosSvc.getVideoById(videoId)');
        });
	}
}]);