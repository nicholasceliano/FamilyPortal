var familyPortalApp = angular.module('familyPortalApp',  ['ngResource']);
familyPortalApp.controller('homeCtrl', function($scope, homeSvc) {
    'use strict';
	
	var home = $scope;
	
	home.videos = [];
		
	home.init = function () {
		//get json data through api
		getVideos();
	};
		
	function getVideos() {
		 homeSvc.getVideos().then(function (resp) {
            home.videos = resp.videos;
        }, function () {
            alert('err');
        });
	};
});
familyPortalApp.factory('homeSvc', function ($q, portalApiSvc) {
    'use strict';

    var service = {};

    //API Calls
    service.getVideos = function () {
		var deffered = $q.defer();
		
        portalApiSvc.Get('/data/videos').get(
        function (resp) { deffered.resolve(resp); },
        function () { deffered.reject(); });

        return deffered.promise;
    };
	
	return service;
});
familyPortalApp.factory('portalApiSvc', function ($resource, $http, $q) {
    'use strict';

    var service = {};

    service.Get = function (uriPath) {
        return $resource(location.origin + uriPath, null);
    };

    service.Post = function (uriPath) {
        return $resource(location.origin + uriPath, null, { save: { method: 'POST' } });
    };

    return service;
});