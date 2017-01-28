familyPortalApp.controller('headerCtrl', function($scope) {
    'use strict';
	
	var header = $scope;
	
	header.logout = function () {
		//do something here
		window.location.replace("/logout");
	};
});