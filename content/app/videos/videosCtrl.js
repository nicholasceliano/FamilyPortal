familyPortalApp.controller('videosCtrl', function($scope, videosSvc) {
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
            alert('Error: videoSvc.getVideos()');
        });
	};
});