/*
http://www.liamoneweb.fr/wp-content/themes/liamone/assets/
*/
/*
 data-ae-anim="" data-ae-delay="" data-ae-trigger=""
*/
/*Document*/
jQuery(document).ready(function($) {

	'use strict';

	//Timeline Max + Scroll magic
	var controller = new ScrollMagic.Controller({addIndicators: true}),
		masterTl = new TimelineMax({paused: true});


	//Functions utilities
	var liamoneBase = {

	};

	var liamoneAjax = {

	};

	var animation = {

		animateElements: function(element) {

			element.each(function() {

				var div = $(this),
					anim = div.data('ae-anim'),
					delay = div.data('ae-delay'),
					trigger = div.data('ae-trigger'),
					aDelay,
					aTrigger;

				aDelay = delay ? delay : 1;
				aTrigger = trigger ? trigger : div;


				div.css({
				    '-webkit-animation-delay': aDelay +'s',
				    '-moz-animation-delay': aDelay +'s',
				    'animation-delay': aDelay +'s'
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

		$('.demand-type').on('click', '.btn', function(e) {

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

		$('.contact-form').on('click','#close-contactUs', function(e) {

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
	
	//Get a random value between min & max
	function getRandomInt(min, max) {

		return Math.floor( Math.random() * (max - min) ) + min;
	
	}

	//Animate yPos of #geo-layer on scroll (+10/-10) and get back to initial yPos(0)
	$(window).scroll(function(e) {

		var currentSt = $(this).scrollTop();

		var geoTl = new TimelineMax({yoyo:true});

		if( currentSt > lastScrollTop ) {

			geoTl.staggerTo( $('#geo-layer'), 5, {y: '10%', ease: Power4.easeOut, onComplete: function(){

					geoTl.staggerTo( $('#geo-layer'), 3, {y: '-=10%', ease: Power4.easeIn} );
				
				}

			} );
		
		}
		else if( lastScrollTop > currentSt ) {

			geoTl.staggerTo( $('#geo-layer'), 5, {y: '-10%', ease: Power4.easeOut, onComplete: function() {

					geoTl.staggerTo( $('#geo-layer'), 3, {y: '+=10%', ease: Power4.easeIn} );

				}

			} );

		}

		lastScrollTop = currentSt;

	});

	//Animate each geometry shape (random yPos value and duration value)
	$('.geometry-layer > .shape').each(function() {

		var randomPos = getRandomInt(150, 250);
		var randomTimer = getRandomInt(5, 10);

		TweenMax.to( $(this), 10, {rotation: 360, ease: Linear.easeNone, repeat:-1} );
		TweenMax.fromTo( $(this), 6, {y: '0'}, {y: '+='+randomPos+'%', ease: Sine.easeInOut, yoyo:true, repeat:-1} );

	});


	/*Ajax TEST*/
	var currentItem = '',
		itemScrollTop,
		itemScrollLeft,
		itemClone;

	var currentPage,
		currentPageClass,
		currentProjectClass,
		targetPage;

	var activLi = $('#top-menu').find('.nav-item');

		//Projets timelines
	var tlProjects,
		tlProject,
		//Home timelines
		tlHero,
		tlLiamone,
		tlObjectifs,
		tlProjets,
		tlExpertises,
		tlCompetences,
		tlClients,
		tlActus,
		//Services timelines
		tlServices,
		//Formations timelines
		tlTraining,
		//Jobs timelines
		tlJobs,
		//Equipe timelines
		tlTeam,
		//Contact timelines
		tlContact;

	var scrollTop;

	var init = {

		/*HOME*/
		headerfooter: function() {

			console.log('Header & Footer chargé');

			$('.menu-top a, .menu-bottom a').on('click', function(e) {

				var rel = $(this).prop('rel');

				if( rel === 'external')  {

					console.log('Lien externe');
					return;
				}

				e.preventDefault();

				var target = $(this),
					targetUrl = target.attr('href');

				if( $('body').hasClass('menu-open') ) {

					$('.menu-toggle').trigger('click').delay(150).queue(function() {

						loadPage(targetUrl);
						history.pushState({page:targetUrl}, null, targetUrl);
						$(this).dequeue();

					});

				}
				else {

					loadPage(targetUrl);
					history.pushState({page:targetUrl}, null, targetUrl);

				}

				controller.scrollTo(0);

			});

		},
		home: function() {

			CustomEase.create('cubicAnim', '1, 0, 0.5, 1');

			console.log('Accueil chargé');

			tlHero = new TimelineLite({paused: true, delay: 0.2});
			tlLiamone = new TimelineLite({paused: true, delay: 0.1});
			tlObjectifs = new TimelineLite({paused: true, delay: 0.2});
			tlProjets = new TimelineLite({paused: true});
			tlExpertises = new TimelineLite({paused: true});
			tlCompetences = new TimelineLite({paused: true});
			tlClients = new TimelineLite({paused: true});
			tlActus = new TimelineLite({paused: true});

			//ANIMATION HERO HEADER
			TweenLite.set( $('.hero-title > span'), {autoAlpha: 0, y: '25%'} )
			TweenLite.set( $('.hero-title .dot'), {autoAlpha: 0, scaleX: '0', scaleY: '0', transformOrigin: '50% 50%'} )
			TweenLite.set( $('.cta-scroll'), {autoAlpha: 0, y: '25%'} )
			
			tlHero
				.to( $('.hero-title > span:first-child'), 0.8, {autoAlpha: 1, y:'-=25%', ease: Power2.easeOut}, 0 )
				.to( $('.hero-title > span:last-child'), 0.8, {autoAlpha: 1, y:'-=25%', ease: Power2.easeOut}, 0.2 )
				.to( $('.hero-title .dot'), 0.4, {autoAlpha: 1, scaleX: '1', scaleY: '1', ease: Power2.easeIn}, 0.3 )
				.to( $('.cta-scroll'), 0.5, {y:'-=25%', autoAlpha: 1, ease: Power4.easeOut}, 0.4 );

			tlHero.play().timeScale(1);

			//ANIMATION LIAMONE SECTION
			TweenLite.set( $('.liamone .yellow-title'), {autoAlpha: 0, x:'-100%'} );
			TweenLite.set( $('.liamone .big-title > span'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.liamone p'), {autoAlpha: 0} );
			TweenLite.set( $('.liamone hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.liamone .dot'), {autoAlpha: 0, scaleX: '0', scaleY: '0', transformOrigin: '50% 50%'} );
			TweenLite.set( $('.liamone .right-block img'), {autoAlpha: 0, transformOrigin: '0 50%', scaleX: '0'} );
			TweenLite.set( $('.liamone .big-number'), {autoAlpha: 0, y: '40%'} );

			tlLiamone
				.to( $('.liamone .yellow-title'), 0.8,{autoAlpha: 1, x: '+=100%',ease: Power2.easeOut}, 0 )
				.to( $('.liamone .big-title > span:first-of-type'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0.2 )
				.to( $('.liamone .big-title > span:nth-of-type(2)'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0.3 )
				.to( $('.liamone .big-title > span:last-of-type'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0.4 )
				.to( $('.liamone .dot'), 0.5, {autoAlpha: 1, scaleX: '1', sclaeY: '1', ease: Power2.easeIn}, 0.45 )
				.to( $('.liamone hr'), 0.5, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.5 )
				.to( $('.liamone .right-block img'), 0.8, {autoAlpha: 1, scaleX: '1', ease: 'cubicAnim'}, 0.5 )
				.to( $('.liamone p'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.7 )
				.to( $('.liamone .big-number'), 0.6, {autoAlpha: 1, y: '-=40%', ease: Power2.easeOut}, 1 );


			//ANIMATION OBJECTIFS SECTION
			TweenLite.set( $('.objectif .big-title'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.objectif .big-number'), {autoAlpha: 0, y: '100%'} );
			TweenLite.set( $('.objectif hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.objectif p, .objectif a'), {autoAlpha: 0} );

			tlObjectifs
				.to( $('.objectif .big-title'), 0.8, {autoAlpha: 1, x:'+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.objectif hr'), 0.8, {autoAlpha: 1, x:'+=100%', ease: Power2.easeOut}, 0.2 )
				.to( $('.objectif p'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.4 )
				.to( $('.objectif a'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.5 )
				.to( $('.objectif .big-number'), 0.6, {autoAlpha: 1, y: '-=100%', ease: Power2.easeOut}, 1 );


			//ANIMATION PROJETS SECTION
			TweenLite.set( $('.projet .big-title'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.projet .dot'), {autoAlpha: 0, scale: '0', transformOrigin: '50% 50%'} );
			TweenLite.set( $('.projet hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.projet .big-number'), {autoAlpha: 0, y: '100%'} );
			TweenLite.set( $('.projet .block-card img'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.projet .card-caption'), {autoAlpha: 0, x: '5%'} );
			TweenLite.set( [$('.projet .card-caption h3'), $('.projet .card-caption p'), $('.projet .card-caption a')], {autoAlpha: 0} );


			tlProjets
				.to( $('.projet .big-title'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.projet .dot'), 0.5, {autoAlpha: 1, scale: '1', ease: Power2.easeIn}, 0.2)
				.to( $('.projet hr'), 0.4, {autoAlpha: 1, x: '+=100%'}, 0.3 )
				//1st project card
				.to( $('.projet .block-card:first-of-type img'), 0.6, {autoAlpha: 1, x: '+=100%', ease: 'cubicAnim'}, 0.5 )
				.to( $('.projet .block-card:first-of-type .card-caption'), 0.4, {autoAlpha: 1, x: '-=5%', ease: 'cubicAnim'}, 0.7 )
				.to( $('.projet .block-card:first-of-type h3'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 0.8 )
				.to( $('.projet .block-card:first-of-type p'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1 )
				.to( $('.projet .block-card:first-of-type a'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.05 )
				//2nd project card
				.to( $('.projet .block-card:nth-of-type(2) img'), 0.6, {autoAlpha: 1, x: '+=100%', ease: 'cubicAnim'}, 0.6 )
				.to( $('.projet .block-card:nth-of-type(2) .card-caption'), 0.4, {autoAlpha: 1, x: '-=5%', ease: 'cubicAnim'}, 0.8 )
				.to( $('.projet .block-card:nth-of-type(2) h3'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 0.9 )
				.to( $('.projet .block-card:nth-of-type(2) p'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.1 )
				.to( $('.projet .block-card:nth-of-type(2) a'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.15 )
				//3rd project card
				.to( $('.projet .block-card:nth-of-type(3) img'), 0.6, {autoAlpha: 1, x: '+=100%', ease: 'cubicAnim'}, 0.7 )
				.to( $('.projet .block-card:nth-of-type(3) .card-caption'), 0.4, {autoAlpha: 1, x: '-=5%', ease: 'cubicAnim'}, 0.9 )
				.to( $('.projet .block-card:nth-of-type(3) h3'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1 )
				.to( $('.projet .block-card:nth-of-type(3) p'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.2 )
				.to( $('.projet .block-card:nth-of-type(3) a'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.25 )
				.to( $('.projet .big-number'), 0.6, {autoAlpha: 1, y: '-=100%', ease: Power2.easeOut}, 1); 


			//ANIMATION EXPERTISES SECTION
			TweenLite.set( $('.expertises .big-title'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.expertises .big-number'), {autoAlpha: 0, y: '100%'} );
			TweenLite.set( $('.expertises hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.expertises .dot'), {autoAlpha: 0, scale: '0', transformOrigin: '50% 50%'} );
			TweenLite.set( $('.expertises p'), {autoAlpha: 0} );
			TweenLite.set( $('.expertises .content-list'), {autoAlpha: 0, y: '5%'} );

			tlExpertises
				.to( $('.expertises .big-title'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.expertises .dot'), 0.5, {autoAlpha: 1, scale: '1', ease: Power2.easeIn}, 0.2)
				.to( $('.expertises hr'), 0.4, {autoAlpha: 1, x: '+=100%'}, 0.3 )
				.to( $('.expertises .block-left p:first-of-type'), 0.4, {autoAlpha: 1}, 0.5 )
				.to( $('.expertises .block-left p:last-of-type'), 0.4, {autoAlpha: 1}, 0.6 )
				.to( $('.expertises .content-list:first-of-type'), 0.4, {autoAlpha: 1, y: '-=5%'}, 0.7 )
				.to( $('.expertises .content-list:nth-of-type(2)'), 0.4, {autoAlpha: 1, y: '-=5%'}, 0.8 )
				.to( $('.expertises .content-list:nth-of-type(3)'), 0.4, {autoAlpha: 1, y: '-=5%'}, 0.9 )
				.to( $('.expertises .content-list:last-of-type'), 0.4, {autoAlpha: 1, y: '-=5%'}, 1 )
				.to( $('.expertises .big-number'), 0.6, {autoAlpha: 1, y: '-=100%'}, 1 );


			//ANIMATION COMPETENCES SECTION


			//ANIMATION CLIENTS SECTION


			//ANIMATION ACTUS SECTION

			$('.cta-scroll').on('click', function(e) {

				e.preventDefault();
				controller.scrollTo('.liamone');
			
			});

			$('.toAnimate').viewportChecker({
				repeat: false,
				offset: 20,
				callbackFunction: function(elem, action) {

					//Section LIAMONE
					if( elem.hasClass('liamone') ) {
						
						if( elem.hasClass('visible') && action == "add" && !elem.hasClass('isAnimated') ) {

							elem.addClass('isAnimated');
							tlLiamone.play().timeScale(1);
						
						}
						
					}

					//Section OBJECTIF
					if( elem.hasClass('objectif') ) {
						
						if( elem.hasClass('visible') && action == "add" && !elem.hasClass('isAnimated') ) {

							elem.addClass('isAnimated');
							tlObjectifs.play().timeScale(1);
						
						}
						
					}

					//Section PROJET
					if( elem.hasClass('projet') ) {
						
						if( elem.hasClass('visible') && action == "add" && !elem.hasClass('isAnimated') ) {

							elem.addClass('isAnimated');
							tlProjets.play().timeScale(1);
						
						}
						
					}

					//Section EXPERTISES
					if( elem.hasClass('expertises') ) {
						
						if( elem.hasClass('visible') && action == "add" && !elem.hasClass('isAnimated') ) {

							elem.addClass('isAnimated');
							tlExpertises.play().timeScale(1);
						
						}
						
					}

					//Section COMPETENCES
					if( elem.hasClass('competences') ) {
						
						if( elem.hasClass('visible') && action == "add" && !elem.hasClass('isAnimated') ) {

							elem.addClass('isAnimated');
							tlCompetences.play().timeScale(1);
						
						}
						
					}

					//Section CLIENTS
					if( elem.hasClass('clients') ) {
						
						if( elem.hasClass('visible') && action == "add" && !elem.hasClass('isAnimated') ) {

							elem.addClass('isAnimated');
							tlClients.play().timeScale(1);
						
						}
						
					}

					//Section CLIENTS
					if( elem.hasClass('actus') ) {
						
						if( elem.hasClass('visible') && action == "add" && !elem.hasClass('isAnimated') ) {

							elem.addClass('isAnimated');
							tlActus.play().timeScale(1);
						
						}
						
					}

				}

			});


		},
		/*PROJECTS*/
		projects: function() {

			console.log('Projets chargé');

			scrollTop = $(window).scrollTop();

			$('.projects-list .project-item').on('click', '.link-toProject', function(e) {

				e.preventDefault();
				currentItem = $(this).parent().parent(),
				itemScrollTop = currentItem.offset().top,
				itemScrollLeft = currentItem.offset().left,
				itemClone = currentItem.clone();

				var singleUrl = currentItem.find('.btn').attr('href');
				history.pushState({page:singleUrl}, null, singleUrl);

				TweenMax.to(currentItem.find('.project-link'), 0.3, {autoAlpha: 0, ease: Linear.easeNone, onComplete: function() {

						itemClone.addClass('project-clone').css({

							position: 'fixed',
							height: currentItem.outerHeight(),
							zIndex: 800

						});

						TweenMax.set(itemClone, {left: itemScrollLeft, top: itemScrollTop} );
						TweenMax.to(itemClone, 0.5, { left: 0, top: 0, width: '100%', height: '100%', ease: Linear.easeNone} );
					
					} 

				} );


				$('body').addClass('load-project');

				itemClone.appendTo('body').delay(20).queue(function() {

					$(this).addClass('is-active').delay(900).queue(function(){

						$.ajax({

							type: "GET",
							url: singleUrl,
							success: function(data) {

								console.log('Projet chargé !');
								var dataProject = $(data).find('.project-focus');

								TweenMax.set(window, {scrollTo: {y: 0, autoKill: false} } );

								var newTitle = dataProject.data('project');
								document.title = 'Liamone - '+ newTitle;

								currentProjectClass = newTitle;

								console.log(newTitle);

								$('.content-container').append(dataProject).delay(30).queue(function() {

									$('.content-container > main').not('.project-focus').remove();
									itemClone.hide();
									$('body').addClass('project-added').removeClass('load-project');
									init.projectFocus();
									$(this).dequeue();

								});

							},
							error: function(data) {

								console.log('Et merde...');
								//console.log(data);
							}

						});

						$(this).dequeue();

					});

					$(this).dequeue();

				});

			});

		},
		/*PROJECT*/
		projectFocus: function() {

			console.log('Projet chargé');
		},
		/*SERVICES*/
		services: function() {

			console.log('Services chargé');
			
		},
		/*TRAINING*/
		training: function() {	

			console.log('Formations chargé');
		},
		/*JOBS*/
		jobs: function() {

			console.log('Jobs chargé');
		},
		/*JOB*/
		jobDetail: function() {

			console.log('Offre chargé');
		},
		/*TEAM*/
		team: function() {

			console.log('Equipe chargé');
		},
		/*CONTACT*/
		contact: function() {

			console.log('Contact chargé');
		},

	};

	/*BUILD*/
	var build = function() {

		init.headerfooter();


		currentPage = $('main');
		var targetPageClass = currentPage.data('page-class');
		currentProjectClass = currentPage.data('project');

		$('body').addClass(targetPageClass).addClass(currentProjectClass).delay(800).queue(function(){

			controller.scrollTo(0);
			initPage(targetPageClass);

			$(this).removeClass('loading').delay(800).queue(function() {

				$(this).addClass('loaded');
				$(this).dequeue();

			}).dequeue();

		});

		currentPageClass == targetPageClass;


		$(window).on('popstate', function(e) {

			var state = event.originalEvent.state;

			if( state ) {

				loadPage(location.href);
				controller.scrollTo(0);

			}

		});

	};

	build();

	function loadPage(url) {

		//Load content, add loading class to body, remove loaded/load-project, add delay
		$('body').removeClass('loaded load-project').addClass('loading').delay(900).queue(function() {

			$.ajax({

				type: 'GET',
				url: url,
				success: function(data) {

					var pageData =  $(data).find('main'),
						newTitle = pageData.data('page-title'),
						targetPageClass = pageData.data('page-class');

					document.title = "Liamone - "+ newTitle;

					//Delete last page
					$('.content-container > main').remove();

					//Insert new page
					$('.content-container').prepend(pageData);

					currentPage = $('main');

					if( currentProjectClass ) {

						$('body').removeClass(currentProjectClass);
					}

					currentProjectClass = currentPage.data('project');

					if( currentProjectClass ) {

						$('body').addClas(currentProjectClass);

					}

					controller.scrollTo(0);

					$('body').removeClass(currentPageClass)
							.addClass(targetPageClass)
							.delay(500).queue(function() {

						$(this).removeClass('loading').delay(300).queue(function() {

							$(this).addClass('loaded');
							$(this).dequeue();

						});

						initPage(targetPageClass);
						$(this).dequeue();

					});

					currentPageClass = targetPageClass;

				}

			});

			$(this).dequeue();

		});
	
	};

	function initPage(pageClass) {

		if( $('body').hasClass('home-page') ) {

			$('header.menu-top').addClass('menu-home');

		}
		else  {

			$('header.menu-top').removeClass('menu-home');
		}

		$('header.menu-top .activ-page').removeClass('activ-page');

		$('main a').on('click', function(e) {

			var rel = $(this).prop('rel');

			if( rel === 'external' ) {

				//console.log('Lien externe');
				return;

			}

			if( $(this).hasClass('item-title') ) {

				//console.log('Formation, tab');
				return;

			}

			e.preventDefault();
			var target = $(this),
				targetUrl = target.attr('href');

			loadPage(targetUrl);
			history.pushState({page:targetUrl}, null, targetUrl);	

		});

		console.log(pageClass);

		switch(pageClass) {

			case 'home-page':
				init.home();
				break;
			case 'projects':
				init.projects();
				break;
			case 'projectFocus':
				init.projectFocus();
				break;
			case 'services':
				init.services();
				break;
			case 'training':
				init.training();
				break;
			case 'jobs':
				init.jobs();
				break;
			case 'team':
				init.team();
				break;
			case 'contact':
				init.contact();
				break;
			default:
				return;

		}

	};

});