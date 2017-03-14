familyPortalApp.controller('familyMembersCtrl', ['$scope', 'familyMembersSvc', 'notificationService', function($scope, familyMembersSvc, notificationService) {
    'use strict';
	
	var familyMembers = $scope;
	
	familyMembers.familyMemberPaging = { ct: 9, startItem: 0, totalRecords: 0, loading: false };
	
	familyMembers.familyMembersArray = [];
	familyMembers.familyMembersLoading = true;
		
	familyMembers.init = function () {
		//get json data through api
		familyMembers.getFamilyMembers(familyMembers.familyMemberPaging.ct, familyMembers.familyMemberPaging.startItem);
	};
		
	familyMembers.getFamilyMembers = function(ct, startItem) {
		 familyMembersSvc.getFamilyMembers(ct, startItem).then(function (resp) {
			 if (resp.err)
				 notificationService.error(resp.value);
			 else {
				 $(resp.value).each(function(i,e) {
					familyMembers.familyMembersArray.push(familyMembersSvc.formatFamilyMemberData(e));
				});
				
				familyMembers.familyMemberPaging.startItem = familyMembers.familyMemberPaging.startItem + resp.page.ct;
				familyMembers.familyMemberPaging.totalRecords = resp.page.totalRecords;
			 }
				
			familyMembers.familyMemberPaging.loading = false;
			familyMembers.familyMembersLoading = false;
        }, function () {
            notificationService.error('Error: familyMembers.familyMembersArray()');
        });
	};
}]);