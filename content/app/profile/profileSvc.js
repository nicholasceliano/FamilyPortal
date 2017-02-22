familyPortalApp.factory('profileSvc', [function () {
    'use strict';

    var service = {};
	
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