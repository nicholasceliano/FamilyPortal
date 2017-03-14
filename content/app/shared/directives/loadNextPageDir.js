familyPortalApp.directive('loadNextPage', function(){
	return {
		restrict:'E',
		scope: {
			items: "@",
			pagingVariables: "=",
			loadNextPageFn: "&"
		},
		link: function (scope, element, attributes) { 		
			$(element).find('a').click(function () {
				scope.pagingVariables.loading = true;
				
				var ct = getNextPageCt(scope.pagingVariables.ct, scope.pagingVariables.startItem, scope.pagingVariables.totalRecords);
				
				scope.loadNextPageFn({ ct: ct, pagingStartItem: scope.pagingVariables.startItem });
			});
        },
		templateUrl:'/dist/templates/loadNextPageTemplate.html'
	};
	
	function getNextPageCt (pagingCt, startItem, totalRecords) {
		if ((startItem + pagingCt) > totalRecords) {
			var tempCt = totalRecords - startItem;
			return tempCt;
		} else {
			return pagingCt;
		}
	}
});