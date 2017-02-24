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
		 familyMembersSvc.getFamilyMembers(-1).then(function (resp) {
			 if (resp.err)
				 notificationService.error(resp.value);
			 else
				familyMembers.familyMembersArray = familyMembersSvc.formatFamilyMemberData(resp.value);
			
			familyMembers.familyMembersLoading = false;
        }, function () {
            notificationService.error('Error: familyMembers.familyMembersArray()');
        });
	};
}]);