familyPortalApp.controller('profileCtrl', ['$scope', 'profileSvc', 'familyMembersSvc', 'imageHelperSvc', 'notificationService', function($scope, profileSvc, familyMembersSvc, imageHelperSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	var savedInfo;
	
	profile.info;
	profile.photoInfo;
	profile.fileToUpload;
	profile.editMode = false;
	profile.shippingAddressSameToggle = false;
	profile.profileInfoLoading = true;
	profile.profilePhotoLoading = true;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
		getProfilePhoto(userId);
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
		
		saveProfileInfo(angular.copy(profile.info));
	};
	
	profile.toggleSameShippingAddress = function () {
		if (profile.shippingAddressSameToggle)
			profile.shippingAddressSameToggle = false;
		else 
			profile.shippingAddressSameToggle = true;
	};
	
	profile.saveImage = function () {
		var originalImgBlob = imageHelperSvc.dataURItoBlob(profile.fileToUpload);
		
		//Converts image size and saves
		var reader = new FileReader();  
		reader.onload = function(e) {
			var imageFormData = new FormData();
			var resizedImgUri = imageHelperSvc.convertImageSize(e, 225,225)
			var resizedImgBlob = imageHelperSvc.dataURItoBlob(resizedImgUri);
			imageFormData.append('file', resizedImgBlob);
			saveProfileImage(profile.photoInfo._id, imageFormData);
		}
		reader.readAsDataURL(originalImgBlob);
	};
	
	function saveProfileImage(id, postData) {
		familyMembersSvc.saveFamilyMemberProfileImageById(id, postData).then(function (resp) {
			notificationService.success('Profile Image Successfully Updated');
			profile.photoInfo.userImage = resp.userImage;
		}, function () {
			notificationService.error('Error: familyMembersSvc.saveFamilyMemberProfileImageById(id, postData)');
		});
	}
			
	function getProfileInfo(userId) {
		 familyMembersSvc.getFamilyMemberById(userId).then(function (resp) {
			profile.info = resp.familyMembers;
			savedInfo = angular.copy(profile.info);
			
			if (profileSvc.checkIfAddressesMatch(profile.info))
				profile.shippingAddressSameToggle = true;
			
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
	
	function saveProfileInfo(profileInfo) {
		familyMembersSvc.saveFamilyMemberById(profileInfo).then(function (resp) {
			notificationService.success('Profile Update Successful');
            savedInfo = angular.copy(profile.info);
			profile.editMode = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.saveFamilyMemberById(info)');
        });
	};
	
}]);