familyPortalApp.controller('familyMemberProfileCtrl', ['$scope', 'familyMembersSvc', 'userInfoFormattingSvc', 'notificationService', function($scope, familyMembersSvc, userInfoFormattingSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	profile.info;
	profile.photoInfo;
	profile.profileInfoLoading = true;
	profile.profilePhotoLoading = true;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
		getProfilePhoto(userId);
	};
		
	function getProfileInfo(userId) {
		 familyMembersSvc.getFamilyMemberById(userId).then(function (resp) {
            profile.info = userInfoFormattingSvc.formatUserProfileInfo(resp.familyMembers);
			profile.profileInfoLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getFamilyMemberById(userId)');
        });
	};
	
	function getProfilePhoto(userId) {
		 familyMembersSvc.getFamilyMemberPhotoById(userId).then(function (resp) {
			profile.photoInfo = resp.familyMemberPhotoData;
			
			profile.profilePhotoLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getFamilyMemberById(userId)');
        });
	};
}]);