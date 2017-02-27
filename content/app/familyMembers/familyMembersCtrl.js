familyPortalApp.controller('familyMembersCtrl', ['$scope', 'familyMembersSvc', 'pagingSvc', 'notificationService', function($scope, familyMembersSvc, pagingSvc, notificationService) {
    'use strict';
	
	var familyMembers = $scope;
	
	var pagingCt = 9;
	familyMembers.pagingStartItem = 0;
	familyMembers.pagingTotalRecords = 0;
	familyMembers.nextPageLoading = false;
	
	familyMembers.familyMembersArray = [];
	familyMembers.familyMembersLoading = true;
		
	familyMembers.init = function () {
		//get json data through api
		getFamilyMembers(pagingCt, familyMembers.pagingStartItem);
	};
	
	familyMembers.loadNextPage = function () {
		var ct = pagingSvc.getNextPageCt(pagingCt, familyMembers.pagingStartItem, familyMembers.pagingTotalRecords);
		if (ct > 0){
			familyMembers.nextPageLoading = true;
			getFamilyMembers(ct, familyMembers.pagingStartItem);
		}
	};
		
	function getFamilyMembers(ct, startItem) {
		 familyMembersSvc.getFamilyMembers(ct, startItem).then(function (resp) {
			 if (resp.err)
				 notificationService.error(resp.value);
			 else {
				 $(resp.value).each(function(i,e) {
					familyMembers.familyMembersArray.push(familyMembersSvc.formatFamilyMemberData(e));
				});
				
				familyMembers.pagingStartItem = familyMembers.pagingStartItem + resp.page.ct;
				familyMembers.pagingTotalRecords = resp.page.totalRecords;
			 }
				
			familyMembers.nextPageLoading = false;
			familyMembers.familyMembersLoading = false;
        }, function () {
            notificationService.error('Error: familyMembers.familyMembersArray()');
        });
	}
}]);