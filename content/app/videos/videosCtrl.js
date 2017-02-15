familyPortalApp.controller('videosCtrl', ['$scope', 'videosSvc', 'notificationService', function($scope, videosSvc, notificationService) {
    'use strict';
	
	var videos = $scope;
	
	videos.videosArray = [];
	videos.videosLoading = true;
		
	videos.init = function () {
		//get json data through api
		getVideos();
	};
		
	function getVideos() {
		 videosSvc.getVideos().then(function (resp) {
            videos.videosArray = resp.videos;
			videos.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getVideos()');
        });
	};
}]);