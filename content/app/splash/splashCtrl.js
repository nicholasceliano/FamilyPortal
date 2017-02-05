familyPortalApp.controller('splashCtrl', function($scope, splashSvc, videosSvc, familyMembersSvc, notificationService) {
    'use strict';
	
	var splash = $scope;
	
	var numRecentVideos = 8;
	var numRecentFamilyMembers = 5;
	
	splash.videosArray = [];
	splash.familyMembersArray = [];
	
	splash.init = function () {
		getRecentVideos();
		getRecentFamilyMembers();
	};
	
	function getRecentVideos() {
		videosSvc.getRecentVideos(numRecentVideos).then(function (resp) {
            splash.videosArray = splashSvc.calculateDayDiff(resp.videos);
        }, function () {
            notificationService.error('Error: videoSvc.getRecentVideos(numRecentVideos)');
        });
	}
	
	function getRecentFamilyMembers() {
		familyMembersSvc.getRecentFamilyMembers(numRecentFamilyMembers).then(function (resp) {
            splash.familyMembersArray = resp.familyMembers;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getRecentFamilyMembers(numRecentFamilyMembers)');
        });
	}
	
});