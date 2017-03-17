familyPortalApp.factory('imagesFolderSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};
	
	service.setFolderName = function (folderName) {
		return (folderName.slice(-1) == '/' ? folderName : folderName + '/');
	};
	
	service.saveFolder = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/folder').save({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.getFolders = function (folderPath) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/folder').get({ folderPath: folderPath },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.deleteFolder = function (folderPath) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/folder').delete({ folderPath: folderPath },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};

	return service;
}]);