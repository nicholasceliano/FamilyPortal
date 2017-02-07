familyPortalApp.factory('profileSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getFamilyMemberById = function (id) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/familymember', { id: id }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveFamilyMemberById = function (id, postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/familymember').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	return service;
}]);