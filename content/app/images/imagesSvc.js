familyPortalApp.factory('imagesSvc', ['$q', 'portalApiSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

	service.buildFolderBreadcrumbs = function (folderName) {
		var breadcrumbArray = [];
		var folderArray = folderName.split('\/');
		folderArray.pop();
		
		$(folderArray).each(function(i,e) {		
			if (i === 0) {
				breadcrumbArray.push({text: 'Images', folder: '/'});
			} else {
				var folderLoc = '';
				
				$(folderArray).each(function(i2,e2) {
					if (i2 <= i)
						folderLoc = folderLoc + e2 + '/';
				});
				
				breadcrumbArray.push({text: e, folder: folderLoc});
			}
		});
		
		return breadcrumbArray;
	};
	
    //API Calls
	service.saveImage = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.ImageApi('/api/v1/images/photo').saveImage({}, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.updateImage = function (postData) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id/photo').save({ id: postData.id }, postData,
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};
	
	service.deleteImage = function (imageId, fullFileName) {
		var deffered = $q.defer();
		
        portalApiSvc.Api('/api/v1/images/:id/photo').delete({ id: imageId, fileName: fullFileName },
			function (resp) { deffered.resolve(resp); },
			function () { deffered.reject(); }
		);

        return deffered.promise;
	};

	return service;
}]);