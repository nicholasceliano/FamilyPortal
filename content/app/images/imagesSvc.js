familyPortalApp.factory('imagesSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getImages = function () {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/data/images').get(
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
    };
	
	service.saveImage = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/data/image').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	}
	
	service.saveFolder = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/data/image/folder').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	}

	return service;
}]);