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
		 videosSvc.getVideos(-1).then(function (resp) {
			 if (resp.err) 
				 notificationService.error(resp.value);
			 else
				videos.videosArray = resp.value;
			
			videos.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getVideos()');
        });
	};
}]);