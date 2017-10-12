

/*Document*/
jQuery(document).ready(function($) {

	'use strict';

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

	var filterAndSort = {

		callFilter: function(element, event) {

			element.on(event, function(e) {

				e.preventDefault();

				filterVal = $(this).data('filter') || $(this).val();
				filterAndSort.filter(filterVal);

			});
			
		},
		filter: function(value) {

			var listToFilter = $('.block-formation .row'),
				itemToShow = $('.block-formation').find('div[data-category*='+value+']');

			var hideItemTl = new TimelineMax({paused: true}),
				showItemTl = new TimelineMax({paused: true});

			hideItemTl
				.set(listToFilter, {x: '0', autoAlpha: 1} )
				.to(listToFilter, 0.5, {x: '+=10%', autoAlpha: 0, ease: Power3.easeOut, onComplete: function() {

						listToFilter.css('display', 'none');
						showItemTl.play();

					}

				});

			hideItemTl.play().timeScale(1);

			showItemTl
				.set(itemToShow, {x: '-10%', autoAlpha: 0})
				.to(itemToShow, 0.5, {x: '+=10%', autoAlpha: 1, ease: Power3.easeIn, onComplete: function() {

						itemToShow.css('display', 'block');

					}

				})
				.set(itemToShow, {x: '0', autoAlpha: 1});


			if( value === '' ) {

				TweenMax.set(listToFilter, {x: '0', autoAlpha: 1, onComplete: function() {

						listToFilter.css('display', 'block');

					}

				});

			}

		}

	};

	//Variables
	var demandType,
		wH = $(window).height(),
		wW = $(window).width();


	controller.scrollTo( function(newpos){

		TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease: Power4.easeInOut } );
	
	});

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
	if( $('main').hasClass('home') ) {

		$('.cta-scroll').on('click', function(e) {

			e.preventDefault();

			controller.scrollTo('.liamone');
		});

	}
	//Training page tabs & filter
	else if( $('main').hasClass('training') ) {

		//Tabs toggle for each div
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

		//Filter content (by select input on mobile, and 4 buttons in desktop)
		var filterContent = window.matchMedia(' (max-width: 1199px)').matches ? $('.filter-field') : $('.filter-cta'),
			filterVal,
			categoryIsAll = true;

		if( window.matchMedia('(max-width: 1199px)').matches ) {

			filterAndSort.callFilter(filterContent, 'change');

		}
		else  {

			filterAndSort.callFilter(filterContent, 'click');

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
	//Services slider with swiper.js
	else if( $('main').hasClass('services') ) {

		var swiper = new Swiper ('.swiper-container', {

			direction: 'horizontal',
			loop: true,
			nextButton: '.nav-next',
			prevButton: '.nav-prev',
			pagination: '.swiper-pagination',
			paginationType: 'fraction',
			lazyLoading: true

		});

	}
	//Contact form reveal & input hide/show
	else if( $('main').hasClass('contact') ) {

		function demandIsType(type) {

			if( type === 'project' ) {

				$('#is-project, #is-company').fadeIn(500);
				$('#is-training, #is-contact').hide();

			}
			else if( type === 'training' ) {

				$('#is-training').fadeIn(500);
				$('#is-project, #is-contact, #is-company').hide();

			}
			else if( type === 'contact' ) {

				$('#is-contact').fadeIn(500);
				$('#is-project, #is-training, #is-company').hide();

			}

		};

		$('.demand-type > .btn').on('click', function(e) {

			e.preventDefault();

			demandType = $(this).data('type');

			var formOpenTl = new TimelineMax();

			CustomEase.create('cubicAnim', '1, 0, 0.5, 1');

			demandIsType(demandType);

			if( !$('#form-contactUs').hasClass('form-open') ) {

				formOpenTl
					.set( $('.reveal-form'), {transformOrigin: '0 50%', scaleX: '0'} )
					.set( $('#form-contactUs'), {className: '+=form-open', autoAlpha: 1} )
					.to( $('.reveal-form'), 0.5, {scaleX: '1', ease: 'cubicAnim'} )
					.set( $('.reveal-form'), {transformOrigin: '100% 50%'} )
					.to( $('.reveal-form'), 0.5, {scaleX: '0', delay: 0.2, ease: Power3.easeOut} )
					.fromTo( $('#form-contactUs .form-group'), 0.3, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone}, '-=0.25' );
			}

			controller.scrollTo('.demand-type');

		});

		$('#close-contactUs').on('click', function(e) {

			e.preventDefault();

			TweenMax.to( $('#form-contactUs'), 0.5, {autoAlpha: 0, className: '-=form-open'} );

			controller.scrollTo('header.menu-top');

		});

	}
	//Projects to projects details request & transition
	else if( $('main').hasClass('projects') ) {

	}

	//Geo-layers shapes floating
	var lastScrollTop = 0;

	var layerGeo = TweenMax.fromTo( $('#geo-layer'), 10, {y: '0'}, {y: '-=20%', ease: Power2.easeInOut, yoyo:true, repeat:-1} );
	var scrolledGeo = TweenMax.to( $('#geo-layer'), 2, {y: '+=20%', ease: Power2.easeInOut} );

	scrolledGeo.pause();
	layerGeo.play();

	$(window).scroll(function(e) {

		var currentSt = $(this).scrollTop();

		if( currentSt > lastScrollTop ) {

			layerGeo.pause();
			scrolledGeo.play();

		}
		else {

			layerGeo.play();
			scrolledGeo.pause();
		}

		lastScrollTop = currentSt;

	});

	$('.geometry-layer > .shape').each(function() {

		TweenMax.to( $(this), 10, {rotation:360, ease: Linear.easeNone, repeat:-1} );
		TweenMax.fromTo( $(this), 6, {y: '0'}, {y: '+=100%', ease: Power3.easeInOut, yoyo:true, repeat:-1} );

	});

});