familyPortalApp.factory('familyMembersSvc', ['$q', 'portalApiSvc', 'userInfoFormattingSvc', function ($q, portalApiSvc, userInfoFormattingSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getFamilyMembers = function (ct, start) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/familymembers', { ct: ct, start: start }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.getFamilyMemberById = function (id) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/familymembers', { id: id }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.getFamilyMemberPhotoById = function (id) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/familymembers/photo', { id: id }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveFamilyMemberById = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/familymembers').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveFamilyMemberProfileImageById = function (id, postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/familymembers/photo').saveImage({ id: id }, postData,
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