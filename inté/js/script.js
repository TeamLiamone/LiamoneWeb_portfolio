
/*Timeline Max + Scroll magic*/
var controller = new ScrollMagic.Controller({addIndicators: true}),
	masterTl = new TimelineMax({paused: true});


//Functions utilities
var animation = {

	animateElements: function(el) {

		el.each(function() {

			var div = $(this),
				anim = div.attr('data-anim'),
				delay = div.attr('data-delay'),
				trigger = div.attr('data-trigger'),
				aDelay,
				aTrigger;

			aDelay = delay ? delay : 1;
			aTrigger = trigger ? trigger : div;


			div.css({
			    '-webkit-animation-delay':  aDelay + 's',
			    '-moz-animation-delay':     aDelay + 's',
			    'animation-delay':          aDelay + 's'
			});

			div.addClass('animated');

			var animScene = new ScrollMagic.Scene({

				triggerElement: aTrigger,
				offset: -100,
				triggerHook: 0,
				reverse: false,
				duration: '100%'

			})
			.setTween( TweenMax.fromTo( this, 1, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.EaseInOut}))
			.setClassToggle(this, anim)
			.addTo(controller);

		});

	}
};

var toggleTab = {

	getTab: function(content, target) {

		content.each( function() {

			if( $(this).attr('id') === target ) {

				$(this).addClass('content-activ');
				TweenMax.to( $(this), 0.5, {autoAlpha: 1, ease: Power1.easeInOut});
			
			}
			else {

				TweenMax.to( $(this), 0.5, {autoAlpha: 0, ease: Power1.easeInOut});
				$(this).removeClass('content-activ');

			}

		});

	},
	clickTab: function(content, el) {

		var ref = el.attr('data-tab');

		toggleTab.getTab(content, ref);

	},
	closeTab: function(content, el) {

		el.removeClass('item-activ');
		TweenMax.to( content, 0.5, {autoAlpha: 0, ease: Power1.easeInOut} );
		content.removeClass('content-activ');

	}

};

/*Document*/
$(document).ready(function() {

	'use strict';
	
	//Burger Btn
	$('.menu-toggle').on('click', function(e) {

		e.preventDefault();
		$('body').toggleClass('menu-open');
		$(this).toggleClass('toggle-open');

	});

	//Menu-top position fixed after hero header is out of screen
	if( !$('.menu-top').hasClass('is-visible') ) {

		var wHeight = $(window).height();

		$('.menu-top').each(function() {

			var togglePosition = new ScrollMagic.Scene({

				triggerElement: $('main > header'),
				offset: wHeight - 100,
				triggerHook: 1,
				reverse: true

			})
			.setClassToggle(this, 'is-visible')
			.addTo(controller);

		});

	}

	//Show-Hide Training tabs
	if( $('main').hasClass('training') ) {

		var blockFormation  = $ ('.block-formation .row');

		blockFormation.each( function() {

			var tabLinks = $(this).find('.item-title'),
				tabContent = $(this).find('.content-block');

			tabLinks.on('click', function(e) {

				e.preventDefault();

				toggleTab.clickTab(tabContent, $(this));

				tabLinks.removeClass('item-activ');
				$(this).addClass('item-activ');

			});

		});

		var filterContent = window.matchMedia(' (max-width: 1199px)').matches ? $('.filter-filed') : $('.filter-cta'),
			filterVal,
			categoryIsAll = true;


		/*if( window.matchMedia(' (max-width: 1199px').matches ) {

			filterContent = $('.filter-field');

			filterContent.on('change', function() {


				filterVal= $(this).text();
				console.log(filterVal);
			});

		}
		else {

			filterContent = $('.filter-cta');

			filterContent.each(function() {

				$(this).on('click', function(e) {

					e.preventDefault();

					filterVal= $(this).data('filter') || $(this).text();
					filter(filterVal);
					console.log(filterVal);

				});

			});

		}*/

		filterContent.on('click change', function(e) {

			e.preventDefault();

			filterVal = $(this).data('filter') || $(this).val();
			filter(filterVal);

			console.log(filterVal);
		});


		function filter(value) {

			var listToFilter = $('.block-formation .row');

			TweenMax.set(listToFilter, {autoAlpha: 0} );

			$('.block-formation').find('div[data-category*=' +value+ ']').each(function() {

				TweenMax.to(this, 0.5, {autoAlpha: 1, ease: Power1.easeInOut} );

			});
		}

	}
	//Projects thumbs reveal
	else if( $('main').hasClass('projects') && window.matchMedia(' (min-width: 768px)').matches ) {
		
		var projectMask = $('.projects-list').find('.project-item');

		projectMask.each( function() {

			var textToExpand = $(this).find('.visible-text');

			var expandMask = new ScrollMagic.Scene({

				triggerElement: this,
				offset: -100,
				triggerHook: 0.8,
				reverse: true,
				duration: '100%'

			})
			//.setTween(TweenMax.fromTo(textToExpand, 1, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.EaseInOut} ) )
			.setClassToggle(this, 'is-inView')
			.addTo(controller);

		});

	}

/*
	var slider = $('.content-slider'),
		item = slider.find('.slider-block'),
		activItem = slider.find('.slide-activ'),
		navPrev = $('.nav-prev'),
		navNext = $('.nav-next'),
		slideCount = item.length,
		totalItems = $('.count-total'),
		inViewItem = $('.count-passed'),
		currentCount = 1,
		currentSlideId = 0,
		prevSlideId,
		isPlaying = false;

	var slider = {

		init: function() {

			TweenMax.set(item.not(activItem), {autoAlpha: 0} );
			TweenMax.set(navPrev, {autoAlpha: 0.2} );

			navPrev.on('click', function(e) {

				e.preventDefault();
				goToPrev();

			});

			navNext.on('click', function(e) {

				e.preventDefault();
				goToNext();

			});
		},
		goToNext: function() {

		},
		goToPrev: function() {

		},
		navigation: function() {

		},
	};

	slider.init();
*/
});

