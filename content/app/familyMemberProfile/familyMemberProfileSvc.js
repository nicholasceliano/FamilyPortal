familyPortalApp.factory('familyMemberProfileSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
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
	
	return service;
}]);