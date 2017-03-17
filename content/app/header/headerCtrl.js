familyPortalApp.controller('headerCtrl', ['$scope', 'headerSvc', 'arraySvc', function($scope, headerSvc, arraySvc) {
    'use strict';
	
	var header = $scope;
	
	header.$on('$routeChangeStart', function(next, current){
		setActiveNavItem(current.$$route.originalPath);
		setBreadcrumbs(current.$$route.originalPath);
	});
	
	header.home = function () {
		window.location.replace('/app');
	};
	
	function setActiveNavItem(route) {
		$(".nav a").each(function (i, e) {
			var fullRoute = '/app' + (route == '/' ? '' : route);
			if (headerSvc.isActiveNavItem(fullRoute, e.pathname))
				$(this).parent().addClass("active");
			else 
				$(this).parent().removeClass("active");
		});
	}
	
	function setBreadcrumbs(route) {
		$('.breadcrumb').empty();
		var breadcrumbArray = route.split('/');
		breadcrumbArray = arraySvc.makeArrayUnique(breadcrumbArray);
		
		$(breadcrumbArray).each(function(i,e) {
			var currentRoute = false;
			
			if (i === (breadcrumbArray.length - 1))
				currentRoute = true;
			
			var route = e.replace(/\_/g, ' ');
			
			$('.breadcrumb').append(headerSvc.buildBreadcrumbItem(route, currentRoute));
		});
	}
}]);