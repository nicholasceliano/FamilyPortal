var familyPortalApp = angular.module('familyPortalApp',  ['ngResource', 'ngRoute', 'ngCookies', 'jlareau.pnotify', 'ui.bootstrap.contextMenu']);

familyPortalApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
						templateUrl: '/dist/templates/splash.html'
					})
					.when('/calendar', {
						templateUrl: '/dist/templates/calendar.html'
					})
					.when('/videos', {
						templateUrl: '/dist/templates/videos.html'
					})
					.when('/videos/watch', {
						templateUrl: '/dist/templates/videos_watch.html'
					})
					.when('/images', {
						templateUrl: '/dist/templates/images.html',
						reloadOnSearch: false
					})
					.when('/images/view', {
						templateUrl: '/dist/templates/images_view.html'
					})
					.when('/family', {
						templateUrl: '/dist/templates/family.html'
					})
					.when('/family/family_member_profile', {
						templateUrl: '/dist/templates/family_family_member_profile.html'
					})
					.when('/profile', {
						templateUrl: '/dist/templates/profile.html'
					})
					.otherwise({
						templateUrl: '/dist/templates/404.html'
					});
					
	$routeProvider.caseInsensitiveMatch = true;	
	$locationProvider.html5Mode(true);
}]);
