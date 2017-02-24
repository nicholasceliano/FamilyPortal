familyPortalApp.directive('centerImageInDiv', function () {
    return  {
		restrict: 'A',
        link: function(scope, element, attrs) {
			element.bind('load', function() {
				var width = $(element).width();
				var height = $(element).height();
				
				if (width > height)
					$(element).css('display','inline-block');
				else
					$(element).css('display','block');
			});
		}
    }
})