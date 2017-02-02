familyPortalApp.controller('watchCtrl', function($scope, watchSvc) {
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
            alert('Error: watchSvc.getVideoById(videoId)');
        });
	};
});