familyPortalApp.controller('familyMembersCtrl', function($scope, familyMembersSvc) {
    'use strict';
	
	var familyMembers = $scope;
	
	familyMembers.familyMembersArray = [];
		
	familyMembers.init = function () {
		//get json data through api
		getFamilyMembers();
	};
		
	function getFamilyMembers() {
		 familyMembersSvc.getFamilyMembers().then(function (resp) {
            familyMembers.familyMembersArray = familyMembersSvc.formatFamilyMemberData(resp.familyMembers);
        }, function () {
            alert('Error: familyMembers.familyMembersArray()');
        });
	};
});