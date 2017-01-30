familyPortalApp.controller('headerCtrl', function($scope, headerSvc) {
    'use strict';
	
	var header = $scope;
	
	header.init = function () {
		setActiveNavItem();
	}
	
	header.home = function () {
		window.location.replace("/");
	}
	
	header.logout = function () {
		window.location.replace("/logout");
	}
	
	function setActiveNavItem() {
		var route = window.location.pathname;
		
		$(".nav a").each(function (i, e) {
			if (headerSvc.isActiveNavItem(route, e.pathname))
				$(this).parent().addClass("active");
			else 
				$(this).parent().removeClass("active");
		});
	}
});