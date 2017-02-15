familyPortalApp.controller('familyMembersCtrl', ['$scope', 'familyMembersSvc', 'notificationService', function($scope, familyMembersSvc, notificationService) {
    'use strict';
	
	var familyMembers = $scope;
	
	familyMembers.familyMembersArray = [];
	familyMembers.familyMembersLoading = true;
		
	familyMembers.init = function () {
		//get json data through api
		getFamilyMembers();
	};
		
	function getFamilyMembers() {
		 familyMembersSvc.getFamilyMembers().then(function (resp) {
            familyMembers.familyMembersArray = familyMembersSvc.formatFamilyMemberData(resp.familyMembers);
			familyMembers.familyMembersLoading = false;
        }, function () {
            notificationService.error('Error: familyMembers.familyMembersArray()');
        });
	};
}]);