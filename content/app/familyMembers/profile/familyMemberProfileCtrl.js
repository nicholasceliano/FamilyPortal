familyPortalApp.controller('familyMemberProfileCtrl', ['$scope', 'familyMembersSvc', 'userInfoFormattingSvc', 'notificationService', function($scope, familyMembersSvc, userInfoFormattingSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	profile.info = undefined;
	profile.photoInfo = undefined;
	profile.profileInfoLoading = true;
	profile.profilePhotoLoading = true;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
		getProfilePhoto(userId);
	};
		
	function getProfileInfo(userId) {
		 familyMembersSvc.getFamilyMemberById(userId).then(function (resp) {
            if(resp.err)
				notificationService.error(resp.value);
			else 
				profile.info = userInfoFormattingSvc.formatUserProfileInfo(resp.value);
			
			profile.profileInfoLoading = false;
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
			
			profile.profilePhotoLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getFamilyMemberPhotoById(userId)');
        });
	}
}]);