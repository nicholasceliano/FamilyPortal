familyPortalApp.controller('familyMemberProfileCtrl', function($scope, familyMemberProfileSvc, userInfoFormattingSvc, notificationService) {
    'use strict';
	
	var profile = $scope;
	
	profile.info;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
	};
		
	function getProfileInfo(userId) {
		 familyMemberProfileSvc.getFamilyMemberById(userId).then(function (resp) {
            profile.info = userInfoFormattingSvc.formatUserProfileInfo(resp.familyMember);
        }, function () {
            notificationService.error('Error: familyMemberProfileSvc.getFamilyMemberById(userId)');
        });
	};
});