familyPortalApp.factory('familyMembersSvc', ['$q', 'portalApiSvc', 'userInfoFormattingSvc', function ($q, portalApiSvc, userInfoFormattingSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getFamilyMembers = function () {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/familymembers').get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.getRecentFamilyMembers = function (ct) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/familymembers', { ct: ct}).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.formatFamilyMemberData = function (familyMembersArray) {
		$(familyMembersArray).each(function (i,e) {
			e = userInfoFormattingSvc.formatUserProfileInfo(e);
		});
		
		return familyMembersArray;
	};
	
	return service;
}]);