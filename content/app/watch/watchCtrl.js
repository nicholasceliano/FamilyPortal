familyPortalApp.controller('watchCtrl', function($scope, watchSvc, notificationService) {
    'use strict';
	
	var watch = $scope;
	
	watch.videoInfo;
	
	watch.init = function (videoId) {
		getVideoInfo(videoId);
	};

	function getVideoInfo(videoId) {
		 watchSvc.getVideoById(videoId).then(function (resp) {
            watch.videoInfo = resp.video;
        }, function () {
            notificationService.error('Error: watchSvc.getVideoById(videoId)');
        });
	};
});