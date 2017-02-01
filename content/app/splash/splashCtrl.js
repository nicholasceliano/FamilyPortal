familyPortalApp.controller('splashCtrl', function($scope, splashSvc, videosSvc, familyMembersSvc) {
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
            alert('Error: videoSvc.getRecentVideos(numRecentVideos)');
        });
	}
	
	function getRecentFamilyMembers() {
		familyMembersSvc.getRecentFamilyMembers(numRecentFamilyMembers).then(function (resp) {
            splash.familyMembersArray = resp.familyMembers;
        }, function () {
            alert('Error: familyMembersSvc.getRecentFamilyMembers(numRecentFamilyMembers)');
        });
	}
	
});