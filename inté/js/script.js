
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

	}
	//Projects thumbs reveal
	else if( $('main').hasClass('projects') && window.matchMedia(' (min-width: 768px').matches ) {
		var projectMask = $('.projects-list').find('.project-item');

		projectMask.each( function() {

			var expandMask = new ScrollMagic.Scene({

				triggerElement: this,
				offset: -100,
				triggerHook: 0.8,
				reverse: true,
				duration: '100%'

			})
			.setClassToggle(this, 'is-inView')
			.addTo(controller);

		});

	}

});

