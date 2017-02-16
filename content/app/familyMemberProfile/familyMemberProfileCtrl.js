familyPortalApp.controller('familyMemberProfileCtrl', ['$scope', 'profileSvc', 'userInfoFormattingSvc', 'notificationService', function($scope, profileSvc, userInfoFormattingSvc, notificationService) {
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
		 profileSvc.getFamilyMemberById(userId).then(function (resp) {
            profile.info = userInfoFormattingSvc.formatUserProfileInfo(resp.familyMember);
			profile.profileInfoLoading = false;
        }, function () {
            notificationService.error('Error: profileSvc.getFamilyMemberById(userId)');
        });
	};
	
	function getProfilePhoto(userId) {
		 profileSvc.getFamilyMemberPhotoById(userId).then(function (resp) {
			profile.photoInfo = resp.familyMember;
			
			profile.profilePhotoLoading = false;
        }, function () {
            notificationService.error('Error: profileSvc.getFamilyMemberById(userId)');
        });
	};
}]);