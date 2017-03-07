familyPortalApp.controller('familyMemberProfileCtrl', ['$scope', 'familyMembersSvc', 'userInfoFormattingSvc', 'userActivitySvc', 'splashSvc', 'pagingSvc', 'notificationService', function($scope, familyMembersSvc, userInfoFormattingSvc, userActivitySvc, splashSvc, pagingSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	var profileUserId;
	
	var pagingCt = 10;
	profile.pagingStartItem = 0;
	profile.pagingTotalRecords = 0;
	profile.nextPageLoading = false;
	
	profile.info = undefined;
	profile.photoInfo = undefined;
	profile.recentUserActivity = [];
	var profileInfoLoading = true;
	var profilePhotoLoading = true;
	var recentUserActivityLoading = true;
		
	profile.init = function (userId) {
		profileUserId = userId;
		getProfileInfo(profileUserId);
		getProfilePhoto(profileUserId);
		getUserRecentActivity(profileUserId, pagingCt, profile.pagingStartItem);
	};
	
	profile.pageLoading = function () {
		if (profileInfoLoading || profilePhotoLoading || recentUserActivityLoading)
			return true;
		else
			return false;
	};
	
	profile.loadNextPage = function () {
		var ct = pagingSvc.getNextPageCt(pagingCt, profile.pagingStartItem, profile.pagingTotalRecords);
		if (ct > 0){
			profile.nextPageLoading = true;
			getUserRecentActivity(profileUserId, ct, profile.pagingStartItem);
		}
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
	
	function getUserRecentActivity(userId, pagingCt, pagingStartItem) {
		userActivitySvc.getRecentUserActivityById(userId, pagingCt, pagingStartItem).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else {
				var repValues = splashSvc.calculateDayDiff(resp.value, 'ago');
				 $(repValues).each(function(i,e) {
					profile.recentUserActivity.push(e);
				});
				
				profile.pagingStartItem = profile.pagingStartItem + resp.page.ct;
				profile.pagingTotalRecords = resp.page.totalRecords;
			}
			
			profile.nextPageLoading = false;
			recentUserActivityLoading = false;
        }, function () {
            notificationService.error('Error: userActivitySvc.getRecentUserActivityById(userId, pagingCt, pagingStartItem)');
        });
	}
}]);