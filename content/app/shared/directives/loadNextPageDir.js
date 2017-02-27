familyPortalApp.directive('loadNextPage', function(){
	return {
		restrict:'E',
		link: function (scope, element, attributes) { 
			scope.items = attributes.items;
        },
		templateUrl:'/dist/templates/loadNextPageTemplate.html'
	};
});