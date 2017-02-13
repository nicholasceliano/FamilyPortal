familyPortalApp.controller('profileCtrl', ['$scope', 'profileSvc', 'notificationService', function($scope, profileSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	var savedInfo;
	
	profile.info;
	profile.editMode = false;
	profile.shippingAddressSameToggle = false;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
	};
	
	profile.toggleEditMode = function () {
		if (profile.editMode) {
			profile.info = angular.copy(savedInfo);
			profile.editMode = false;
		} else {
			profile.editMode = true;
		}		
	};
	
	profile.save = function () {
		if (profile.shippingAddressSameToggle)
			profileSvc.setAddressAsShipAddress(profile.info);
		
		saveProfileInfo(profile.info);
	};
	
	profile.toggleSameShippingAddress = function () {
		if (profile.shippingAddressSameToggle)
			profile.shippingAddressSameToggle = false;
		else 
			profile.shippingAddressSameToggle = true;
	}
		
	function getProfileInfo(userId) {
		 profileSvc.getFamilyMemberById(userId).then(function (resp) {
			profile.info = resp.familyMember;
			savedInfo = angular.copy(profile.info);
			
			if (profileSvc.checkIfAddressesMatch(profile.info))
				profile.shippingAddressSameToggle = true;
        }, function () {
            notificationService.error('Error: profileSvc.getFamilyMemberById(userId)');
        });
	};
	
	function saveProfileInfo(profileInfo) {
		 profileSvc.saveFamilyMemberById(profileInfo._id, profileInfo).then(function (resp) {
			notificationService.success('Profile Update Successful');
            savedInfo = angular.copy(profile.info);
			profile.editMode = false;
        }, function () {
            notificationService.error('Error: profileSvc.saveFamilyMemberById(userId, info)');
        });
	};
	
}]);