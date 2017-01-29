familyPortalApp.controller('splashCtrl', function($scope, splashSvc, videosSvc) {
    'use strict';
	
	var splash = $scope;
	
	var numRecentVideos = 8;
	
	splash.videosArray = [];
	
	splash.init = function () {
		getRecentVideos();
	};
	
	function getRecentVideos() {
		videosSvc.getRecentVideos(numRecentVideos).then(function (resp) {
            splash.videosArray = splashSvc.calculateDayDiff(resp.videos);
        }, function () {
            alert('Error: videoSvc.getRecentVideos()');
        });
	}
});