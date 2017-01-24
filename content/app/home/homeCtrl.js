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
            alert('Error: homeSvc.getVideos()');
        });
	};
});