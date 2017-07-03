angular.module('app')
.directive('fullContainerSlider', [
'$timeout',
'$window',

function($timeout, $window){
	return {
		restrict: 'E',
	    scope: false,
	    link: function(scope, e, attrs) {
	    	console.log(attrs);

	    	//setup data structure
	    	e.find('slide').wrapAll('<div class="slideContainer"></div>')
	    	e.find('slide').each(function(){
	    		$(this).children().wrapAll('<div class="slide-content"></div>')
	    	})
	    	//get refs for data
			var slideContainer = e.find('.slideContainer'),
				slides = e.find('slide'),
				nSlides = slides.length;

			//watchers
			attrs.$observe('activeSlide', setActiveSlidePosition);
			angular.element($window).on('resize', setDimentions);
			scope.$on('$destroy', cleanUp);

			//init
			setDimentions();

			function setDimentions(){
				setSlideContainerDimentions();
				setSlideDimentions();
				setSlideOrientation();
				setActiveSlidePosition();
			}

			function setSlideContainerDimentions(){
				slideContainer.css('width',e.parent().width() * nSlides);
				slideContainer.css('height',e.parent().height());
			}

			function setSlideDimentions(){
				slides.css('width', e.parent().width());
				slides.css('height', e.parent().height());
			}

			function setSlideOrientation(){
				_.each(slides, function(e, i){
					$(e).css('left', i * $(e).width());
				})
			}

			function setActiveSlidePosition(){
				slideContainer.css('margin-left', -1 * attrs.activeSlide * e.parent().width());
			}

			function cleanUp() {
				angular.element($window).off('resize', setDimentions);
			}
            
	    }
	}
}]);