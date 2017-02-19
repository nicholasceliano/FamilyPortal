familyPortalApp.directive('resizeHeightToSquare', function ($window) {
    return function (scope, element) {
        scope.$watch('', function (n, o) {
			$(element).height(function(){
				var width = $(this).width();
				$(this).find('.full-height').css('line-height', width + 'px');
				return width;
			});
        });
    }
})