familyPortalApp.directive('scrollContainer', function() {
	return function (scope, element) {
		scope.$watch('', function (n, o) {
			var scrollContainer = $(element);
			var scrollContent = $(element).find(">:first-child");
			
			scrollContainer.addClass('scroll-container');
			var offset = Math.round(getScrollBarWidth() + scrollContainer.width() - 5);
			
			scrollContent.width(offset).addClass('scroll-content');
			
			scrollContent.scroll(function(){
				var scrollContent = $(this);
				var content = $(this).children();
							
				if (content.height() > scrollContent.height())
					recaulcuateScrollbarTop(this);
			});
			
			buildScrollbar(scrollContainer);
		});
    };     
	
	function getScrollBarWidth() {
		var outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo(outer).outerWidth();
		outer.remove();
		return 100 - widthWithScroll;
	}
	
	function buildScrollbar(scrollContainer) {
		var scrollbarContainerHeight = scrollContainer.height();
		var scrollbarContainer = $('<div class="scrollbar-container"></div>').css({top: -scrollbarContainerHeight});
		var scrollbar = $('<div class="scrollbar"></div>').css({top: 0});
		
		scrollContainer.append(scrollbarContainer);
		scrollbarContainer.append(scrollbar);
	}
	
	function recaulcuateScrollbarTop(scrollContent) {
		var element = $(scrollContent).parent();
		var scrollbar = $(element).find('.scrollbar');
		
		var percentScrolled = scrollContent.scrollTop / (scrollContent.scrollHeight - $(scrollContent).height());
		var maxScrollHeight = $(scrollContent).height() - 20;//-20 for scrollbar height
		var scrollbarTop = percentScrolled * maxScrollHeight;
		
		scrollbar.show();
		scrollbar.css({top: scrollbarTop});
	}
});