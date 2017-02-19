familyPortalApp.directive('centerImageInDiv', function () {
    return function (scope, element) {
        scope.$watch('', function (n, o) {
			var width = $(element).width();
			var height = $(element).height();
			
			if (width > height)
				$(element).css('display','inline-block');
			else
				$(element).css('display','block');
        });
    }
})