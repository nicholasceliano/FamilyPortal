familyPortalApp.controller('profileCtrl', ['$scope', 'profileSvc', 'notificationService', function($scope, profileSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	profile.info;
	profile.editMode = false;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
	};
	
	profile.toggleEditMode = function () {
		if (profile.editMode)
			profile.editMode = false;
		else
			profile.editMode = true;
	};
	
	profile.save = function () {
		saveProfileInfo(profile.info);
	};
		
	function getProfileInfo(userId) {
		 profileSvc.getFamilyMemberById(userId).then(function (resp) {
            profile.info = resp.familyMember;
        }, function () {
            notificationService.error('Error: profileSvc.getFamilyMemberById(userId)');
        });
	};
	
	function saveProfileInfo(profileInfo) {
		 profileSvc.saveFamilyMemberById(profileInfo._id, profileInfo).then(function (resp) {
			notificationService.success('Profile Update Successful');
            profile.editMode = false;
        }, function () {
            notificationService.error('Error: profileSvc.saveFamilyMemberById(userId, info)');
        });
	};
	
}]);