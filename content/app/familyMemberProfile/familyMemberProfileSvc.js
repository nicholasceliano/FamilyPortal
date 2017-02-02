familyPortalApp.factory('familyMemberProfileSvc', function ($q, portalApiSvc, userInfoFormattingSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getFamilyMemberById = function (id) {
		var deffered = $q.defer();
		
        portalApiSvc.Get('/api/data/familymember?id=' + id).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.formatUserProfileInfo = function (userInfo) {
		userInfo = userInfoFormattingSvc.formatUserProfileInfo(userInfo);
		
		return userInfo;
	};
	return service;
});