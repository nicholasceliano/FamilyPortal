familyPortalApp.directive('scrollRepeatContent', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var ul = $(element).parent();
			var scrollContent = ul.parent();
			var panelBody = scrollContent.parent('.panel-body');
			ul.hide();
			
			if (scope.$last === true) {
                $timeout(function () {
					ul.show();
					
					scrollContent.wrap('<div class="scroll-container"></div>');
					var scrollContainer = scrollContent.parent('.scroll-container');
					scrollContent.addClass('scroll-content');
					
					if (ul.height() > panelBody.height()) {					
						var offset = Math.round(getScrollBarWidth() + scrollContainer.width());
						scrollContent.width(offset);
						
						$(window).resize(function (){
							var offset = Math.round(getScrollBarWidth() + scrollContainer.width());
							scrollContent.width(offset);
						});
						
						buildScrollbar(scrollContainer, scrollContent);
					}
				});
			}
		}
	};
		
	function getScrollBarWidth() {
		var outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo(outer).outerWidth();
		outer.remove();
		return 100 - widthWithScroll;
	}
	
	function buildScrollbar(scrollContainer, scrollContent) {
		var scrollbarContainerHeight = scrollContainer.height();
		var scrollbarContainer = $('<div class="scrollbar-container"></div>').css({top: -scrollbarContainerHeight});
		var scrollbar = $('<div class="scrollbar"></div>').css({top: 0});
		var manualScroll;
		var mouseDown = false;
		
		scrollContainer.append(scrollbarContainer);
		scrollbarContainer.append(scrollbar);
		
		scrollContent.scroll(function(){
			if (!mouseDown){
				var scrollContent = $(this);
				var content = $(this).children();
							
				if (content.height() > scrollContent.height())
					recaulcuateScrollbarTop(this);
			}
		});
		
		scrollbar.mousedown(function(event) {			
			mouseDown = true;
			var mousePosition = event.clientY;
			
			scrollbar.addClass('scrollbar-selected');
			$('body').addClass('noselect');
			
			$(document).mousemove(function(event) {
				mousePosition = event.clientY;
			});
			
			 manualScroll = setInterval(function () {
				var scrollbarContainterTop = scrollContainer.offset().top;
				var scrollbarContainterBottom = scrollContainer.offset().top + scrollContainer.height();
				var scrollbarPosition = scrollbarContainterTop;
				
				if (mousePosition < (scrollbarContainterTop))
					scrollbarPosition = scrollbarContainterTop;
				else if (mousePosition > (scrollbarContainterBottom - scrollbar.height()))
					scrollbarPosition = scrollbarContainterBottom - scrollbar.height();
				else 
					scrollbarPosition = mousePosition;
				
				scrollbarPosition = scrollbarPosition - scrollbarContainterTop;
				
				var percentScrolled = scrollbarPosition / (scrollContainer.height() - scrollbar.height());
				var maxScrollHeight = scrollContent[0].scrollHeight - scrollContent.height();
				var scrollbarTop = percentScrolled * maxScrollHeight;
				
				scrollContent.scrollTop(scrollbarTop);
								
				scrollbar.css({top: scrollbarPosition});
			});
		});
				
		$(window).mouseup(function() {
			mouseDown = false;
			scrollbar.removeClass('scrollbar-selected');
			$('body').removeClass('noselect');
			clearInterval(manualScroll);
		});
	}
	
	function recaulcuateScrollbarTop(scrollContent) {
		var scrollContainer = $(scrollContent).parent();
		var scrollbar = scrollContainer.find('.scrollbar');
		
		var percentScrolled = scrollContent.scrollTop / (scrollContent.scrollHeight - $(scrollContent).height());
		var maxScrollHeight = $(scrollContent).height() - scrollbar.height();
		var scrollbarTop = percentScrolled * maxScrollHeight;
		
		scrollbar.show();
		scrollbar.css({top: scrollbarTop});
	}
}]);