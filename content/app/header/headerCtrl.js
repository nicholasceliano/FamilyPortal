familyPortalApp.controller('headerCtrl', function($scope, headerSvc, arraySvc) {
    'use strict';
	
	var header = $scope;
	
	header.init = function () {
		setActiveNavItem();
		setBreadcrumbs()
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
	
	function setBreadcrumbs() {
		var breadcrumbArray = window.location.pathname.split('/');
		breadcrumbArray = arraySvc.makeArrayUnique(breadcrumbArray);
		
		$(breadcrumbArray).each(function(i,e) {
			var currentRoute = false;
			
			if (i === (breadcrumbArray.length - 1))
				currentRoute = true;
			
			e = e.replace(/\_/g, ' ');
			
			$('.breadcrumb').append(headerSvc.buildBreadcrumbItem(e, currentRoute));
		});
	}
});