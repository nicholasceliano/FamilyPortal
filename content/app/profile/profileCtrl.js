familyPortalApp.controller('profileCtrl', ['$scope', 'profileSvc', 'imageSvc', 'notificationService', function($scope, profileSvc, imageSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	var savedInfo;
	
	profile.info;
	profile.fileToUpload;
	profile.editMode = false;
	profile.shippingAddressSameToggle = false;
	profile.profileInfoLoading = true;
		
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
	};
	
	profile.saveImage = function () {
		var originalImgBlob = imageSvc.dataURItoBlob(profile.fileToUpload);
		
		//Converts image size and saves
		var reader = new FileReader();  
		reader.onload = function(e) {
			var imageFormData = new FormData();
			var resizedImgUri = imageSvc.convertImageSize(e, 225,225)
			var resizedImgBlob = imageSvc.dataURItoBlob(resizedImgUri);
			imageFormData.append('file', resizedImgBlob);
			saveProfileImage(savedInfo._id, imageFormData);
		}
		reader.readAsDataURL(originalImgBlob);
	};
	
	function saveProfileImage(id, postData) {
		profileSvc.saveProfileImage(id, postData).then(function (resp) {
			notificationService.success('Profile Image Successfully Updated');
			profile.info.userImage = resp.userImage;
			savedInfo = angular.copy(profile.info);
		}, function () {
			notificationService.error('Error: profileSvc.saveProfileImage(id, postData)');
		});
	}
			
	function getProfileInfo(userId) {
		 profileSvc.getFamilyMemberById(userId).then(function (resp) {
			profile.info = resp.familyMember;
			savedInfo = angular.copy(profile.info);
			
			if (profileSvc.checkIfAddressesMatch(profile.info))
				profile.shippingAddressSameToggle = true;
			
			profile.profileInfoLoading = false;
        }, function () {
            notificationService.error('Error: profileSvc.getFamilyMemberById(userId)');
        });
	};
	
	function saveProfileInfo(profileInfo) {
		 profileSvc.saveFamilyMemberById(profileInfo).then(function (resp) {
			notificationService.success('Profile Update Successful');
            savedInfo = angular.copy(profile.info);
			profile.editMode = false;
        }, function () {
            notificationService.error('Error: profileSvc.saveFamilyMemberById(info)');
        });
	};
	
}]);