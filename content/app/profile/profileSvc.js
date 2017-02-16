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
	
	service.getFamilyMemberPhotoById = function (id) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/familymemberphoto', { id: id }).get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveFamilyMemberById = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/familymember').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveProfileImage = function (id, postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/data/saveimage').saveImage({ id: id }, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	//Data Functions
	service.checkIfAddressesMatch = function (info) {
		return (info.shipLine1 === info.line1 && info.shipLine2 === info.line2 &&
			info.shipCity === info.city && info.shipState === info.state && info.shipPostalCode === info.postalCode);
	};
	
	service.setAddressAsShipAddress = function (info) {
		info.shipLine1 = info.line1;
		info.shipLine2 = info.line2;
		info.shipCity = info.city;
		info.shipState = info.state;
		info.shipPostalCode = info.postalCode;
	};
	
	return service;
}]);