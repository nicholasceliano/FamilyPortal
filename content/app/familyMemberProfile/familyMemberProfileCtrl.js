familyPortalApp.controller('familyMemberProfileCtrl', ['$scope', 'familyMemberProfileSvc', 'userInfoFormattingSvc', 'notificationService', function($scope, familyMemberProfileSvc, userInfoFormattingSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	profile.info;
	profile.profileInfoLoading = true;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
	};
		
	function getProfileInfo(userId) {
		 familyMemberProfileSvc.getFamilyMemberById(userId).then(function (resp) {
            profile.info = userInfoFormattingSvc.formatUserProfileInfo(resp.familyMember);
			profile.profileInfoLoading = false;
        }, function () {
            notificationService.error('Error: familyMemberProfileSvc.getFamilyMemberById(userId)');
        });
	};
}]);