familyPortalApp.controller('videosCtrl', function($scope, videosSvc, notificationService) {
    'use strict';
	
	var videos = $scope;
	
	videos.videosArray = [];
		
	videos.init = function () {
		//get json data through api
		getVideos();
	};
		
	function getVideos() {
		 videosSvc.getVideos().then(function (resp) {
            videos.videosArray = resp.videos;
        }, function () {
            notificationService.error('Error: videoSvc.getVideos()');
        });
	};
});