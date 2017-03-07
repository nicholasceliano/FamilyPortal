familyPortalApp.controller('profileCtrl', ['$scope', 'profileSvc', 'familyMembersSvc', 'imageHelperSvc', 'notificationService', function($scope, profileSvc, familyMembersSvc, imageHelperSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	var savedInfo;
	
	profile.info = undefined;
	profile.photoInfo = undefined;
	profile.fileToUpload = undefined;
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
		var originalImgBlob = imageHelperSvc.dataURItoBlob(profile.fileToUpload.fileData);
		
		//Converts image size and saves
		var reader = new FileReader();  
		reader.onload = function(e) {
			var imageFormData = new FormData();
			var resizedImgUri = imageHelperSvc.convertImageSize(e, 225,225);
			var resizedImgBlob = imageHelperSvc.dataURItoBlob(resizedImgUri);
			imageFormData.append('file', resizedImgBlob);
			saveProfileImage(profile.photoInfo._id, imageFormData);
		};
		reader.readAsDataURL(originalImgBlob);
	};
	
	function saveProfileImage(id, postData) {
		familyMembersSvc.saveFamilyMemberProfileImageById(id, postData).then(function (resp) {
			if (resp.err) {
				notificationService.error(resp.value);
			} else {
				profile.photoInfo.userImage = btoa(resp.value);
				notificationService.success('Profile Image Successfully Updated');
			}
		}, function () {
			notificationService.error('Error: familyMembersSvc.saveFamilyMemberProfileImageById(id, postData)');
		});
	}
			
	function getProfileInfo(userId) {
		 familyMembersSvc.getFamilyMemberById(userId).then(function (resp) {
			 if (resp.err) {
				 notificationService.error(resp.value);
			 } else {
				profile.info = resp.value;
				savedInfo = angular.copy(profile.info);
				
				if (profileSvc.checkIfAddressesMatch(profile.info))
					profile.shippingAddressSameToggle = true;
			 }
			
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
	
	function saveProfileInfo(profileInfo) {
		familyMembersSvc.saveFamilyMemberById(profileInfo._id, profileInfo).then(function (resp) {
			if (resp.err) {
				notificationService.error(resp.value);
			} else {
				profile.info = resp.value;
				savedInfo = angular.copy(profile.info);
				notificationService.success('Profile Update Successful');
			}
			
			profile.editMode = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.saveFamilyMemberById(info)');
        });
	}
	
}]);