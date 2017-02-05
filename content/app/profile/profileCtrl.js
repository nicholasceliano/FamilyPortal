familyPortalApp.controller('profileCtrl', function($scope, profileSvc) {
    'use strict';
	
	var profile = $scope;
	
	profile.info;
		
	profile.init = function (userId) {
		getProfileInfo(userId);
	};
		
	function getProfileInfo(userId) {
		 profileSvc.getFamilyMemberById(userId).then(function (resp) {
            profile.info = resp.familyMember;
        }, function () {
            alert('Error: profileSvc.getFamilyMemberById(userId)');
        });
	};
});