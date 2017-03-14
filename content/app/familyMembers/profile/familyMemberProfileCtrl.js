familyPortalApp.controller('familyMemberProfileCtrl', ['$scope', 'familyMembersSvc', 'userInfoFormattingSvc', 'userActivitySvc', 'splashSvc', 'notificationService', function($scope, familyMembersSvc, userInfoFormattingSvc, userActivitySvc, splashSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	var profileUserId;
	
	profile.info = undefined;
	profile.photoInfo = undefined;
	profile.recentUserActivity = [];
	var profileInfoLoading = true;
	var profilePhotoLoading = true;
	var recentUserActivityLoading = true;
	
	profile.userActivityPaging = { ct: 10, startItem: 0, totalRecords: 0, loading: false };
		
	profile.init = function (userId) {
		profileUserId = userId;
		getProfileInfo(profileUserId);
		getProfilePhoto(profileUserId);
		profile.getUserRecentActivity(profile.userActivityPaging.ct, profile.userActivityPaging.startItem);
	};
	
	profile.pageLoading = function () {
		if (profileInfoLoading || profilePhotoLoading || recentUserActivityLoading)
			return true;
		else
			return false;
	};

	function getProfileInfo(userId) {
		 familyMembersSvc.getFamilyMemberById(userId).then(function (resp) {
            if(resp.err)
				notificationService.error(resp.value);
			else 
				profile.info = userInfoFormattingSvc.formatUserProfileInfo(resp.value);
			
			profileInfoLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getFamilyMemberById(userId)');
        });
	}
	
	function getProfilePhoto(userId) {
		 familyMembersSvc.getFamilyMemberPhotoById(userId).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else
				profile.photoInfo = resp.value;
			
			profilePhotoLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getFamilyMemberPhotoById(userId)');
        });
	}
	
	profile.getUserRecentActivity = function (pagingCt, pagingStartItem) {
		userActivitySvc.getRecentUserActivityById(profileUserId, pagingCt, pagingStartItem).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else {
				var repValues = splashSvc.calculateDayDiff(resp.value, 'ago');
				 $(repValues).each(function(i,e) {
					profile.recentUserActivity.push(e);
				});
				
				profile.userActivityPaging.startItem = profile.userActivityPaging.startItem + resp.page.ct;
				profile.userActivityPaging.totalRecords = resp.page.totalRecords;
			}
			
			profile.userActivityPaging.loading = false;
			recentUserActivityLoading = false;
        }, function () {
            notificationService.error('Error: userActivitySvc.getRecentUserActivityById(userId, pagingCt, pagingStartItem)');
        });
	};
}]);