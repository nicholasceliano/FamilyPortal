familyPortalApp.controller('videosCtrl', ['$scope', 'videosSvc', 'notificationService', function($scope, videosSvc, notificationService) {
    'use strict';
	
	var videos = $scope;
	
	videos.videoPaging = { ct: 25, startItem: 0, totalRecords: 0, loading: false };
	videos.videosArray = [];
	videos.videosLoading = true;
		
	videos.init = function () {
		videos.getVideos(videos.videoPaging.ct, videos.videoPaging.startItem);
	};
		
	videos.getVideos = function (ct, startItem) {
		 videosSvc.getVideos(ct, startItem).then(function (resp) {
			if (resp.err) 
				 notificationService.error(resp.value);
			else {
				 $(resp.value).each(function(i,e) {
					videos.videosArray.push(e);
				});
				
				videos.videoPaging.startItem = videos.videoPaging.startItem + resp.page.ct;
				videos.videoPaging.totalRecords = resp.page.totalRecords;
			}
				
			videos.videoPaging.loading = false;
			videos.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getVideos()');
        });
	};
}]);