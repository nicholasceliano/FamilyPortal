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
		videosSvc.getVideos(numRecentVideos).then(function (resp) {
            splash.videosArray = splashSvc.calculateDayDiff(resp.videos);
			splash.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getRecentVideos(numRecentVideos)');
        });
	}
	
	function getRecentImageMetaData() {
		imagesSvc.getImageMetaData(numRecentImageMetaData).then(function (resp) {
            splash.imageMetaDataArray = splashSvc.calculateDayDiff(resp.imageInfo);
			splash.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesSvc.getImageMetaData(numRecentImageMetaData)');
        });
	}
	
	function getRecentFamilyMembers() {
		familyMembersSvc.getFamilyMembers(numRecentFamilyMembers).then(function (resp) {
            splash.familyMembersArray = resp.familyMembers;
			splash.familyMembersLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getRecentFamilyMembers(numRecentFamilyMembers)');
        });
	}
	
}]);