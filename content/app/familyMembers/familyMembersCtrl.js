familyPortalApp.controller('familyMembersCtrl', ['$scope', 'familyMembersSvc', 'notificationService', function($scope, familyMembersSvc, notificationService) {
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
            notificationService.error('Error: familyMembers.familyMembersArray()');
        });
	};
}]);