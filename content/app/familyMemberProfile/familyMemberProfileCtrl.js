familyPortalApp.controller('familyMemberProfileCtrl', function($scope, familyMemberProfileSvc) {
    'use strict';
	
	var profile = $scope;
	
	profile.info;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
	};
		
	function getProfileInfo(userId) {
		 familyMemberProfileSvc.getFamilyMemberById(userId).then(function (resp) {
            profile.info = familyMemberProfileSvc.formatUserProfileInfo(resp.familyMember);
        }, function () {
            alert('Error: familyMemberProfileSvc.getFamilyMemberById(userId)');
        });
	};
});