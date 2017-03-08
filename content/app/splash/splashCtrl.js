familyPortalApp.controller('splashCtrl', ['$scope', 'splashSvc', 'userActivitySvc', 'videosSvc', 'imagesMetadataSvc', 'familyMembersSvc', 'notificationService', function($scope, splashSvc, userActivitySvc, videosSvc, imagesMetadataSvc, familyMembersSvc, notificationService) {
    'use strict';
	
	var splash = $scope;
	
	var numRecentUserActivity = 3;
	var numRecentVideos = 8;
	var numRecentImageMetaData = 8;
	var numRecentFamilyMembers = 5;
	
	splash.userActivityArray = [];
	splash.userActivityLoading = true;
	splash.videosArray = [];
	splash.videosLoading = true;
	splash.imageMetaDataArray = [];
	splash.imageMetaDataLoading = true;
	splash.familyMembersArray = [];
	splash.familyMembersLoading = true;
	
	splash.init = function () {
		getRecentUserActivity();
		getRecentVideos();
		getRecentImageMetaData();
		getRecentFamilyMembers();
	};
	
	function getRecentUserActivity() {
		userActivitySvc.getRecentUserActivity(numRecentUserActivity).then(function (resp) {
			  if (resp.err)
				notificationService.error(resp.value);
			else
				splash.userActivityArray = splashSvc.calculateDayDiff(resp.value, 'ago');
			
			splash.userActivityLoading = false;
		}, function () {
			notificationService.error('Error: videoSvc.getRecentUserActivity(numRecentUserActivity)');
		});
	}
	
	function getRecentVideos() {
		videosSvc.getVideos(numRecentVideos, 0).then(function (resp) {
            if (resp.err)
				notificationService.error(resp.value);
			else
				splash.videosArray = splashSvc.calculateDayDiff(resp.value, 'old');
			
			splash.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getRecentVideos(numRecentVideos)');
        });
	}
	
	function getRecentImageMetaData() {
		imagesMetadataSvc.getImageMetaData(numRecentImageMetaData, 0, '').then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else 
				splash.imageMetaDataArray = splashSvc.calculateDayDiff(resp.value, 'old');
			
			splash.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesMetadataSvc.getImageMetaData(numRecentImageMetaData)');
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