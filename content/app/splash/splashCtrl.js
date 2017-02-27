familyPortalApp.controller('splashCtrl', ['$scope', 'splashSvc', 'videosSvc', 'imagesSvc', 'familyMembersSvc', 'notificationService', function($scope, splashSvc, videosSvc, imagesSvc, familyMembersSvc, notificationService) {
    'use strict';
	
	var splash = $scope;
	
	var numRecentVideos = 8;
	var numRecentImageMetaData = 8;
	var numRecentFamilyMembers = 5;
	
	splash.videosArray = [];
	splash.videosLoading = true;
	splash.imageMetaDataArray = [];
	splash.imageMetaDataLoading = true;
	splash.familyMembersArray = [];
	splash.familyMembersLoading = true;
	
	splash.init = function () {
		getRecentVideos();
		getRecentImageMetaData();
		getRecentFamilyMembers();
	};
	
	function getRecentVideos() {
		videosSvc.getVideos(numRecentVideos, 0).then(function (resp) {
            if (resp.err)
				notificationService.error(resp.value);
			else
				splash.videosArray = splashSvc.calculateDayDiff(resp.value);
			
			splash.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getRecentVideos(numRecentVideos)');
        });
	}
	
	function getRecentImageMetaData() {
		imagesSvc.getImageMetaData(numRecentImageMetaData, 0).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else 
				splash.imageMetaDataArray = splashSvc.calculateDayDiff(resp.value);
			
			splash.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesSvc.getImageMetaData(numRecentImageMetaData)');
        });
	}
	
	function getRecentFamilyMembers() {
		familyMembersSvc.getFamilyMembers(numRecentFamilyMembers, 0).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else 
				splash.familyMembersArray = resp.value;
			
			splash.familyMembersLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getRecentFamilyMembers(numRecentFamilyMembers)');
        });
	}
	
}]);