familyPortalApp.controller('videosCtrl', ['$scope', 'videosSvc', 'pagingSvc', 'notificationService', function($scope, videosSvc, pagingSvc, notificationService) {
    'use strict';
	
	var videos = $scope;
	
	var pagingCt = 25;
	videos.pagingStartItem = 0;
	videos.pagingTotalRecords = 0;
	videos.nextPageLoading = false;
	
	videos.videosArray = [];
	videos.videosLoading = true;
		
	videos.init = function () {
		//get json data through api
		getVideos(pagingCt, videos.pagingStartItem);
	};
	
	videos.loadNextPage = function () {
		var ct = pagingSvc.getNextPageCt(pagingCt, videos.pagingStartItem, videos.pagingTotalRecords);
		if (ct > 0){
			videos.nextPageLoading = true;
			getVideos(ct, videos.pagingStartItem);
		}
	};
		
	function getVideos(ct, startItem) {
		 videosSvc.getVideos(ct, startItem).then(function (resp) {
			if (resp.err) 
				 notificationService.error(resp.value);
			else {
				 $(resp.value).each(function(i,e) {
					videos.videosArray.push(e);
				});
				
				videos.pagingStartItem = videos.pagingStartItem + resp.page.ct;
				videos.pagingTotalRecords = resp.page.totalRecords;
			}
				
			videos.nextPageLoading = false;
			videos.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getVideos()');
        });
	}
}]);