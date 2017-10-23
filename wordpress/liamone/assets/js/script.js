/*
http://www.liamoneweb.fr/wp-content/themes/liamone/assets/
*/
/*
 data-ae-anim="" data-ae-delay="" data-ae-trigger=""
*/

/*
History api detection
if ( window.history && window.history.pushState ) {
  // Do stuff…
}
*/



/*Document*/
jQuery(document).ready(function($) {

	'use strict';

	//Timeline Max + Scroll magic
	var controller = new ScrollMagic.Controller({addIndicators: true}),
		masterTl = new TimelineMax({paused: true});

	//Variables
	var demandType,
		lastSTop = 0,
		wH = $(window).height(),
		wW = $(window).width(),
		actuCard = $('.actus').find('figure.actu-card');


	controller.scrollTo( function(newpos){

		TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease: Power4.easeInOut } );
	
	});

	//Functions utilities
	var initFunctions = {


		loading: function() {

			if($('body').hasClass('first')) {

				$('body').delay(250).queue(function(){

					$(this).removeClass('first').dequeue();

				});

			}

		},
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

		},
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
			initFunctions.getTab(content, ref);

		},
		closeTab: function(content, el) {

			el.removeClass('item-activ');
			TweenMax.to( content, 0.5, {autoAlpha: 0, ease: Power1.easeInOut} );
			content.removeClass('content-activ');

		},
		callFilter: function(element, event) {

			element.on(event, function(e) {

				e.preventDefault();

				var filterVal = $(this).data('filter') || $(this).val();
				initFunctions.filter(filterVal);

			});
			
		},
		filter: function(value) {

			var listToFilter = $('.block-formation .row'),
				itemToShow = $('.block-formation').find('div[data-category*='+value+']');

			var hideItemTl = new TimelineLite({paused: true}),
				showItemTl = new TimelineLite({paused: true});

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

				TweenLite.set(listToFilter, {x: '0', autoAlpha: 1, onComplete: function() {

						listToFilter.css('display', 'block');

					}

				});

			}

		},
		projectMask: function() {

			var projectMask = $('.projects-list').find('.project-item');

			if( window.matchMedia(' (min-width: 768px)').matches ) {

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

		},
		serviceSwiper: function() {

			var swiper = new Swiper('.swiper-container', {

				direction: 'horizontal',
				loop: true,
				nextButton: '.nav-next',
				prevButton: '.nav-prev',
				pagination: '.swiper-pagination',
				paginationType: 'fraction',
				lazyLoading: true

			});

		},
		trainingTabs: function() {

			//Tabs toggle for each div
			var blockFormation  = $ ('.block-formation .row');

			blockFormation.each( function() {

				var tabLinks = $(this).find('.item-title'),
					tabContent = $(this).find('.content-block');

				tabLinks.on('click', function(e) {

					e.preventDefault();

					initFunctions.clickTab(tabContent, $(this));
					tabLinks.removeClass('item-activ');
					$(this).addClass('item-activ');

				});

			});

			//Filter content (by select input on mobile, and 4 buttons in desktop)
			var filterContent = window.matchMedia(' (max-width: 1199px)').matches ? $('.filter-field') : $('.filter-cta'),
				filterVal,
				categoryIsAll = true;

			if( window.matchMedia('(max-width: 1199px)').matches ) {

				initFunctions.callFilter(filterContent, 'change');

			}
			else  {

				initFunctions.callFilter(filterContent, 'click');

			}

		},
		demandIsType: function(type) {

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

		},
		showContactForm: function(type) {

			if( !type ) { return; }

			var formOpenTl = new TimelineLite();
			CustomEase.create('cubicAnim', '1, 0, 0.5, 1');

			initFunctions.demandIsType(type);

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

		},
		closeContactForm: function() {

			TweenMax.to( $('#form-contactUs'), 0.5, {autoAlpha: 0, className: '-=form-open'} );
			controller.scrollTo('header.menu-top');

		},
		contactFormControls: function() {

			$('.demand-type').on('click', '.btn', function(e) {

				e.preventDefault();

				var type = $(this).data('type'),
					formOpenTl = new TimelineLite();
				CustomEase.create('cubicAnim', '1, 0, 0.5, 1');
				initFunctions.showContactForm(type);

			});

			$('.contact-form').on('click','#close-contactUs', function(e) {

				e.preventDefault();
				initFunctions.closeContactForm();

			});

		},
		getRandomInt: function(min, max) {

			return Math.floor( Math.random() * (max - min) ) + min;

		},
		geoLayer: function(currentScrollTop, lastScrollTop) {

			var geoTl = new TimelineMax({yoyo:true});

			if( currentScrollTop > lastScrollTop ) {

				geoTl.staggerTo( $('#geo-layer'), 5, {y: '10%', ease: Power4.easeOut, onComplete: function(){

						geoTl.staggerTo( $('#geo-layer'), 3, {y: '-=10%', ease: Power4.easeIn} );
					
					}

				} );
			
			}
			else if( lastScrollTop > currentScrollTop ) {

				geoTl.staggerTo( $('#geo-layer'), 5, {y: '-10%', ease: Power4.easeOut, onComplete: function() {

						geoTl.staggerTo( $('#geo-layer'), 3, {y: '+=10%', ease: Power4.easeIn} );

					}

				} );

			}

		},
		geoLayerShapes: function() {

			$('.geometry-layer > .shape').each(function() {

				var randomPos = initFunctions.getRandomInt(150, 250);
				var randomTimer = initFunctions.getRandomInt(5, 10);

				TweenMax.to( $(this), 10, {rotation: 360, ease: Linear.easeNone, repeat:-1} );
				TweenMax.fromTo( $(this), 6, {y: '0'}, {y: '+='+randomPos+'%', ease: Sine.easeInOut, yoyo:true, repeat:-1} );

			});

		},
		toggleActus: function(card) {

			$('.actus').on('click', '.btn', function(e) {

				e.preventDefault();

				$(this).toggleClass('show-more')

				if( !$(this).hasClass('show-more') ) {

					$(this).html('En voir plus');	
					card.slice(7).hide();

				}
				else {

					$(this).html('En voir moins');
					card.slice(7).show();

				}

			});

		},
		calculatePosition(element) {

			var rect = element.getBoundingClientRect();

			var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
			var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

			var clientTop = root.clientTop || body.clientTop || 0;
			var clientLeft = root.clientLeft || body.clientLeft || 0;

			return {
				top: Math.round(rect.top + scrollTop - clientTop),
				left: Math.round(rect.left + scrollLeft - clientLeft),
				height: rect.height,
				width: rect.width
			};

		},

	};
	
	/*
	ANIMATION
	*/
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

	var pageAnimation = {
	
		home: function() {

			CustomEase.create('cubicAnim', '1, 0, 0.5, 1');

			tlHero = new TimelineLite({paused: true, delay: 0.2});
			tlLiamone = new TimelineLite({paused: true, delay: 0.1});
			tlObjectifs = new TimelineLite({paused: true, delay: 0.2});
			tlProjets = new TimelineLite({paused: true, delay: 0.1});
			tlExpertises = new TimelineLite({paused: true, delay: 0.1});
			tlCompetences = new TimelineLite({paused: true, delay: 0.1});
			tlClients = new TimelineLite({paused: true, delay: 0.1});
			tlActus = new TimelineLite({paused: true, delay: 0.1});

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
				.to( $('.projet hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.3 )
				//1st project card
				.to( $('.projet .block-card:first-of-type img'), 1, {autoAlpha: 1, x: '+=100%', ease: 'cubicAnim'}, 0.5 )
				.to( $('.projet .block-card:first-of-type .card-caption'), 0.4, {autoAlpha: 1, x: '-=5%', ease: 'cubicAnim'}, 0.7 )
				.to( $('.projet .block-card:first-of-type h3'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 0.8 )
				.to( $('.projet .block-card:first-of-type p'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1 )
				.to( $('.projet .block-card:first-of-type a'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.05 )
				//2nd project card
				.to( $('.projet .block-card:nth-of-type(2) img'), 1, {autoAlpha: 1, x: '+=100%', ease: 'cubicAnim'}, 0.6 )
				.to( $('.projet .block-card:nth-of-type(2) .card-caption'), 0.4, {autoAlpha: 1, x: '-=5%', ease: 'cubicAnim'}, 0.8 )
				.to( $('.projet .block-card:nth-of-type(2) h3'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 0.9 )
				.to( $('.projet .block-card:nth-of-type(2) p'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.1 )
				.to( $('.projet .block-card:nth-of-type(2) a'), 0.2, {autoAlpha: 1, ease: Linear.easeNone}, 1.15 )
				//3rd project card
				.to( $('.projet .block-card:nth-of-type(3) img'), 1, {autoAlpha: 1, x: '+=100%', ease: 'cubicAnim'}, 0.7 )
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
				.to( $('.expertises hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.3 )
				.to( $('.expertises .block-content p:first-child'), 0.4, {autoAlpha: 1, ease: Linear.easeNone}, 0.5 )
				.to( $('.expertises .block-content p:last-child'), 0.4, {autoAlpha: 1, ease: Linear.easeNone}, 0.6 )
				.to( $('.expertises .content-list:first-of-type'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.7 )
				.to( $('.expertises .content-list:nth-of-type(2)'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.8 )
				.to( $('.expertises .content-list:nth-of-type(3)'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.9 )
				.to( $('.expertises .content-list:last-of-type'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 1 )
				.to( $('.expertises .big-number'), 0.6, {autoAlpha: 1, y: '-=100%', ease: Power2.easeOut}, 1 );


			//ANIMATION COMPETENCES SECTION
			TweenLite.set( $('.competences .big-title'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.competences .big-number'), {autoAlpha: 0, y: '100%'} );
			TweenLite.set( $('.competences hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.competences .content-caption'), {autoAlpha: 0, y: '5%'} );

			tlCompetences
				.to( $('.competences .big-title'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.competences .dot'), 0.5, {autoAlpha: 1,  scale: '1', ease: Power2.easeIn}, 0.2 )
				.to( $('.competences hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.3 )
				.to( $('.competences .content-caption:first-of-type'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.5 )
				.to( $('.competences .content-caption:nth-of-type(2)'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.65 )
				.to( $('.competences .content-caption:nth-of-type(3)'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.8 )
				.to( $('.competences .content-caption:last-of-type'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.95 )
				.to( $('.competences .big-number'), 0.6, {autoAlpha: 1, y: '-=100%', ease: Power2.easeOut}, 1 );

			//ANIMATION CLIENTS SECTION
			TweenLite.set( $('.clients .big-title'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.clients .big-number'), {autoAlpha: 0, y: '100%'} );
			TweenLite.set( $('.clients hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.clients .client-card'), {autoAlpha: 0, y: '5%'} );

			tlClients
				.to( $('.clients .big-title'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.clients .dot'), 0.5, {autoAlpha: 1,  scale: '1', ease: Power2.easeIn}, 0.2 )
				.to( $('.clients hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn, onComplete: function() {

						$('.clients .client-card').each(function() {

							TweenLite.to( this, 0.5, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, '+=0.2');

						});
					
					}

				}, 0.3 )
				.to( $('.clients .big-number'), 0.6, {autoAlpha: 1, y: '-=100%', ease: Power2.easeOut}, 1 );


			//ANIMATION ACTUS SECTION
			TweenLite.set( $('.actus .big-title'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.actus .big-number'), {autoAlpha: 0, y: '100%'} );
			TweenLite.set( $('.actus hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.actus .actu-card'), {autoAlpha: 0} );

			tlActus
				.to( $('.actus .big-title'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.actus .dot'), 0.5, {autoAlpha: 1,  scale: '1', ease: Power2.easeIn}, 0.2 )
				.to( $('.actus hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.3)
				.to( $('.actus .actualite'), 0.4, {autoAlpha: 1, ease: Linear.easeNone}, 0.5)
				.to( $('.actus .actu-card:not(.actualite)'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.7 )
				.to( $('.actus .big-number'), 0.6, {autoAlpha: 1, y: '-=100%', ease: Power2.easeOut}, 1);

			//Check if in viewport
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
		projects: function() {

			tlProjects = new TimelineLite({paused: true, delay: 0.2});

			TweenLite.set( $('.projects .hero-title > span'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.projects .dot'), {autoAlpha: 0, scale: 0, transformOrigin: '50% 50%'} );
			TweenLite.set( $('.projects hr'), {autoAlpha: 0, x: '-100%'} );

			tlProjects
				.to( $('.projects .hero-title > span:first-of-type'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.projects .hero-title > span:last-of-type'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0.1 )
				.to( $('.projects .dot'), 0.4, {autoAlpha: 1, scale: 1, ease: Power2.easeIn}, 0.3 )
				.to( $('.projects hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.4 );

			tlProjects.play().timeScale(1);

		},
		projectFocus: function() {

			tlProject = new TimelineLite({paused:true, delay: 0.2});

			//Project-focus INTRO
			TweenLite.set( $('.project-focus h1'), {autoAlpha: 0, y: '15%'} );
			TweenLite.set( $('.project-focus .project-heading p'), {autoAlpha: 0} );
			TweenLite.set( $('.project-focus .project-heading hr'), {autoAlpha: 0, y: '-100%'} );
			TweenLite.set( $('.project-focus .project-tag li'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.project-focus .cta-scroll'), {autoAlpha: 0, y: '-100%'} );

			tlProject
				.to( $('.project-focus h1'), 0.8, { autoAlpha: 1, y: '-=15%', ease: Power2.easeOut}, 0 )
				.to( $('.project-focus .project-heading p'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.2 )
				.to( $('.project-focus .project-heading hr'), 0.4, {autoAlpha: 1, y: '+=100%', ease: Power2.easeOut}, 0.3 )
				.to( $('.project-focus .project-tag li'), 0.5, {autoAlpha: 1, y: '+=5%', ease: Linear.easeNone}, 0.6 )
				.to( $('.project-focus .cta-scroll'), 0.5, {autoAlpha: 1, y: '+=100%', ease: Power2.easeIn}, 0.7 );

			tlProject.play().timeScale(1);

			//Context section
			var tlContext = new TimelineLite({delay: 0.1});

			TweenLite.set( $('.project-context .project-objectif'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.project-context .project-response'), {autoAlpha: 0, y: '5%'} );

			tlContext
				.to( $('.project-context .project-objectif'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0 )
				.to( $('.project-context .project-response'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.2);

			//Brand section
			var tlBrand = new TimelineLite({delay: 0.1});

			TweenLite.set( $('.project-brand h2'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.project-brand h3'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.project-brand hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.project-brand p'), {autoAlpha: 0} );
			TweenLite.set( $('.project-brand img'), {autoAlpha: 0} );

			tlBrand
				.to( $('.project-brand h2'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0 )
				.to( $('.project-brand h3'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.2 )
				.to( $('.project-brand hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.EaseIn}, 0.3 )
				.to( $('.project-brand p'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.5 )
				.to( $('.project-brand img'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.6 );

			//Design section
			var tlDesign = new TimelineLite({delay: 0.1});

			TweenLite.set( $('.project-design h2'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.project-design h3'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.project-design hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.project-design p'), {autoAlpha: 0} );
			TweenLite.set( $('.project-design img'), {autoAlpha: 0} );

			tlDesign
				.to( $('.project-design h2'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0 )
				.to( $('.project-design h3'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.2 )
				.to( $('.project-design hr'), 0.4, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.3 )
				.to( $('.project-design p'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.5 )
				.to( $('.project-design img'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.6 );
			
			$('.project-focus > section').each(function() {

				var scrollTween;

				if( $(this).hasClass('project-context') ) {

					scrollTween = tlContext;

				}
				else if( $(this).hasClass('project-brand') ) {

					scrollTween = tlBrand;

				}
				else if( $(this).hasClass('project-design') ) {

					scrollTween = tlDesign;

				}

				var focusSection = new ScrollMagic.Scene({

					triggerElement: this,
					offset: -200,
					triggerHook: 0.1,
					reverse: false,
					duration: 0

				})
				.setTween(scrollTween)
				.addTo(controller);

			});

		},
		services: function() {

			tlServices = new TimelineLite({paused: true, delay: 0.2});

			TweenLite.set( $('.services .content-slider'), {autoAlpha: 0} );
			TweenLite.set( $('.services .slider-nav'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.services h1 > span'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.services .separator'), {autoAlpha: 0, x: '-100%', transformOrigin: '50% 50%'} );
			TweenLite.set( $('.services h1 .dot'), {autoAlpha: 0, scale: 0} );

			tlServices
				.to( $('.services h1 > span'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.services .separator'), 0.6, {autoAlpha: 1, x: '+=100%', ease: Power2.easeIn}, 0.2 )
				.to( $('.services h1 .dot'), 0.4, {autoAlpha: 1, scale: 1, ease: Power2.easeIn}, 0.3)
				.to( $('.services .content-slider'), 0.6, {autoAlpha: 1, ease: Linear.easeNone}, 0.5)
				.to( $('.services .slider-nav'), 0.6, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.7 );

			tlServices.play().timeScale(1);	

		},
		training: function() {

			tlTraining = new TimelineLite({paused: true, delay: 0.3});

			TweenLite.set( $('.training h1 > span'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.training h1 .dot'), {autoAlpha: 0, scale: 0, transformOrigin: '50% 50%'} );
			TweenLite.set( $('.training hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.training .hero-grey p'), {autoAlpha: 0} );
			TweenLite.set( $('.training .block-img'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.training .filter-cta'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.training .block-formation .row'), {autoAlpha: 0, y: '5%'} );

			tlTraining
				.to( $('.training h1 > span'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.training h1 .dot'), 0.4, {autoAlpha: 1, scale: 1, ease: Power2.easeIn}, 0.2 )
				.to( $('.training hr'), 0.5, {autoAlpha: 1, x: '+100%', ease: Power2.easeOut}, 0.3 )
				.to( $('.training .hero-grey p'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.5 )
				.to( $('.training .block-img'), 0.5, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.7 )
				.to( $('.training .filter-cta'), 0.5, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.9 )
				.to( $('.training .block-formation .row'), 0.9, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 1.2 );

			tlTraining.play().timeScale(1);

		},
		jobs: function() {

			tlJobs = new TimelineLite({paused: true, delay: 0.3});
			
			TweenLite.set( $('.jobs h1 > span'), {autoAlpha: 0, x: '-100%' } );
			TweenLite.set( $('.jobs h1 .dot'), {autoAlpha: 0, scale: 0, transformOrigin: '50% 50%'} );
			TweenLite.set( $('.jobs .hero-grey hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.jobs .hero-grey p'), {autoAlpha: 0} );
			TweenLite.set( $('.jobs .hero-grey img'), {autoAlpha: 0} );
			TweenLite.set( $('.jobs .block-job'), {autoAlpha: 0, y: '5%'} );

			tlJobs
				.to( $('.jobs h1 > span'), 0.8, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0 )
				.to( $('.jobs h1 .dot'), 0.6, {autoAlpha: 1, scale: 1, ease: Power2.easeIn}, 0.2 )
				.to( $('.jobs .hero-grey hr'), 0.6, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0.3 )
				.to( $('.jobs .hero-grey p'), 0.4, {autoAlpha: 1, ease: Linear.easeNone}, 0.5 )
				.to( $('.jobs .hero-grey img'), 0.6, {autoAlpha: 1, ease: Linear.easeNone}, 0.7 )
				.to( $('.jobs .block-job'), 0.5, {autoAlpha: 1, y: '-=5%', ease: Power2.easeIn}, 1);

			tlJobs.play().timeScale(1);

		}, 
		team: function() {

		},
		contact: function() {

			tlContact = new TimelineLite({paused: true, delay: 0.3});

			TweenLite.set( $('.contact h1 > span'), {autoAlpha: 0} );
			TweenLite.set( $('.contact h1 .dot'), {autoAlpha: 0} );
			TweenLite.set( $('.contact .hero-grey hr'), {autoAlpha: 0, x: '-100%'} );
			TweenLite.set( $('.contact .demand-type .btn'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.contact .find-us'), {autoAlpha: 0} );

			tlContact
				.to( $('.contact h1 > span'), 0.8, {autoAlpha: 1, ease: Linear.easeNone}, 0 )
				.to( $('.contact h1 .dot'), 0.5, {autoAlpha: 1, ease: Linear.easeNone}, 0.2)
				.to( $('.contact .hero-grey hr'), 0.5, {autoAlpha: 1, x: '+=100%', ease: Power2.easeOut}, 0.4 )
				.to( $('.contact .demand-type .btn:first-of-type'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.6 )
				.to( $('.contact .demand-type .btn:nth-of-type(2)'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.7 )
				.to( $('.contact .demand-type .btn:last-of-type'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.8 )
				.to( $('.contact .find-us'), 0.8, {autoAlpha: 1, ease: Linear.easeNone}, 1 );

			tlContact.play().timeScale(1);

		}

	};
	/*
	THREE.JS
	*/	
	var windowHalfX,
		windowHalfY,
		windowWidth,
		windowHeight,
		mousePos,
		container,
		renderer, scene, camera, light, hemiLight,
		FOV, aspectRatio, nearPlane, farPlane;

	var Colors = {

		white: 0xffffff,
		yellowL: 0xffcb00,
		yellowD: 0xff9800,
		blackA: 0x232828,
		blackB: 0x1a1d1d,
		yellowA: 0xffff34,
		yellowB: 0xd09e18,

	};

	var Scene3D = {

		init: function() {

			scene = new THREE.Scene();

			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,
			windowWidth = window.innerWidth,
			windowHeight = window.innerHeight,
			mousePos = {x:0, y: 0},
			container = document.getElementById('backgroundTHREE'),
			FOV = 45,
			aspectRatio = windowWidth / windowHeight, 
			nearPlane = 0.1, 
			farPlane = 5000;

			camera = new THREE.PerspectiveCamera(FOV, aspectRatio, nearPlane, farPlane);
			camera.position.z = 1300;
			scene.add(camera);

			light = new THREE.AmbientLight(0xffffff);
			hemiLight = new THREE.HemisphereLight(Colors.blackA, Colors.blackB);
			//hemiLight = new THREE.HemisphereLight(Colors.yellowA, Colors.yellowB);
			//hemiLight = new THREE.HemisphereLight(Colors.yellowL, Colors.yellowD);
			scene.add(hemiLight);

			renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
			renderer.setSize(windowWidth, windowHeight);
			container.appendChild(renderer.domElement);

			document.addEventListener('mousemove', onMouseMove, false);
			window.addEventListener('resize', onWindowResize, false);

		},
		createGeometry: function() {

			var geometry, material, mesh;
			var posX, posY, posZ;
			var cubeWidth, cubeHeight, cubeLength, 
				randomX, randomY, randomZ;

			for( var i = 0; i < 16; i++ ) {

				randomZ = Math.random() * (0.95 - 0.1) + 0.1;
				randomX = Math.random() * (0.75 - 0.2) + 0.2;
				randomY = Math.random() * (0.5 - 0.05) + 0.05;
				cubeWidth = initFunctions.getRandomInt(160, 400);
				//cubeHeight = initFunctions.getRandomInt(20, 30);
				//cubeLength = initFunctions.getRandomInt(10, 20);

				posX = initFunctions.getRandomInt(-900, 900);
				posY = initFunctions.getRandomInt(-480, 480);
				posZ = initFunctions.getRandomInt(-500, 500);

				geometry = new THREE.CubeGeometry(cubeWidth, 20, 20, 1, 1, 1);
				material = new THREE.MeshPhongMaterial({
					color: Colors.white,
					flatShading: true,
					shininess: 90,
					transparent: true,
					opacity: 0.99,
				});
				mesh = new THREE.Mesh(geometry, material);

				mesh.rotation.x = randomX * Math.PI;
				mesh.rotation.y = randomY * Math.PI;
				mesh.rotation.z = randomZ * Math.PI;
				mesh.position.set(posX, posY, posZ);
				mesh.receiveShadow = true;
				scene.add(mesh);

			}

		},
		animateGeometry: function() {

		},
		render: function() {

			camera.position.x += ( - mousePos.x - camera.position.x ) * 0.1;
			camera.position.y += ( mousePos.y - camera.position.y ) * 0.1;
			camera.lookAt(scene.position);

			renderer.render(scene, camera);

		},
		build: function() {

			Scene3D.render();
			requestAnimationFrame(Scene3D.build);

		}

	};

	function onMouseMove(event) {

		mousePos.x = (event.clientX - windowHalfX);
		mousePos.y = (event.clientY - windowHalfY);

	};
	function onWindowResize() {

		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		renderer.setSize(windowWidth, windowHeight);
		camera.aspect = windowWidth / windowHeight;
		camera.updateProjectionMatrix();

	};
	function init3DScene() {

		Scene3D.init();
		Scene3D.createGeometry();
		Scene3D.build();

	};

	/*
	BASIC SITE FUNCTIONS
	*/
	//Burger Btn
	$('.menu-toggle').on('click', function(e) {

		e.preventDefault();
		$('body').toggleClass('menu-open');
		$(this).toggleClass('toggle-open');

	});

	//Menu-top position fixed after hero header is out of screen
	if( !$('.menu-top').hasClass('is-visible') ) {

		$('.menu-top').each(function() {

			var togglePosition = new ScrollMagic.Scene({

				triggerElement: $('main > header'),
				offset: wH - 100,
				triggerHook: 1,
				reverse: true

			})
			.setClassToggle(this, 'is-visible')
			.addTo(controller);

		});

	}

	/*
	NO-AJAX
	*/
	function siteNav() {

		var pageClass = $('main').data('page-class');

			switch(pageClass) {

				case 'home-page':

					initFunctions.loading();
					pageAnimation.home();
					init3DScene();

					$('main.home .cta-scroll').on('click', function(e) {

						e.preventDefault();
						controller.scrollTo('.liamone');

					});

					if (actuCard.length > 7 )  {

						actuCard.slice(7).hide();
						initFunctions.toggleActus(actuCard);
					};
					break;
				case 'projects-page':
					pageAnimation.projects();
					initFunctions.projectMask();
					break;
				case 'projectFocus':
					pageAnimation.projectFocus();
					break;
				case 'services-page':
					pageAnimation.services();
					initFunctions.serviceSwiper();
					break;
				case 'training-page':
					pageAnimation.training();
					initFunctions.trainingTabs();
					break;
				case 'job-page':
					pageAnimation.jobs();
					break;
				case 'team-page':
					break;
				case 'contact-page':
					pageAnimation.contact();
					initFunctions.contactFormcontrols();
					break;
				default:
					return;

			}

		$(window).on('load', function() {

			$('body').delay(200).queue(function() {

				$('body').removeClass('loading');

			});

		});

	};

	/*
	AJAX NAVIGATION
	*/
	var currentItem = '',
		currentType = undefined,
		itemScrollTop,
		itemScrollLeft,
		itemClone;

	var currentPage,
		currentPageClass,
		currentProjectClass,
		targetPage;

		//Projets timelines

	var scrollTop;

	var logo = {

		liamoneLogo: '<svg version="1.1" id="liamone-logoBlack" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 36" enable-background="new 0 0 96 36" xml:space="preserve" width="96" height="36"> <title>Liamone, agence digitale</title> <g id="liamone"> <g> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-148.8634" y1="-64.4275" x2="-137.6216" y2="-64.4275" gradientTransform="matrix(1.1878 0 0 1.1878 231.1475 92.702)"> <stop  offset="0" style="stop-color:#FFD300"/> <stop  offset="1" style="stop-color:#F39200"/> </linearGradient> <path fill="url(#SVGID_1_)" d="M54.7,17.6c0.6,1.3,1.5,2.5,2.7,3c1.2,0.6,2.5,0.6,3.7,0.2s2.3-1.1,2.8-2.1 c0.3-0.5,0.5-0.9,0.5-1.3c0-0.2,0-0.4-0.1-0.6c-0.1-0.3-0.2-0.5-0.3-0.7c-0.4-0.9-1.2-1.5-2.2-1.8c-0.9-0.3-1.9-0.2-2.3-0.1 c-0.2,0.1-0.3,0-0.4,0.2c-0.2,0.2-0.2,0.6-0.2,1.1c0.2,0.9,0.8,1.9,2.4,2l0.2,0.4C61,18.5,60,18.8,59,18.7c-1-0.2-2-0.8-2.6-1.7 c-0.6-0.8-1-2-1-3.2c0.1-0.6,0.3-1.3,0.6-1.9c0.4-0.6,0.9-1.1,1.4-1.4c0.3-0.2,0.5-0.3,0.9-0.5c0.2-0.1,0.2-0.1,0.4-0.2 c0.2-0.1,0.3-0.1,0.4-0.1c0.6-0.2,1.1-0.2,1.7-0.2c1.1,0,2.1,0.3,3,0.8c1.8,0.9,3.2,2.6,3.8,4.5c0.2,0.5,0.2,1,0.3,1.4 c0.1,0.5,0,1.1-0.1,1.6c-0.2,1-0.7,2-1.4,2.6c-1.3,1.4-3,2.1-4.7,2.4c-1.7,0.2-3.5-0.2-4.8-1.2s-2.1-2.6-2.4-4H54.7z"/> <g> <g> <path fill="#628C2E" d="M61.9,4.2c-1.2,1.9-0.9,4.3-0.8,5l0,0c0.1-0.1,0.1-0.2,0.1-0.3s0.1-0.2,0.1-0.3s0.1-0.2,0.2-0.3 c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.2,0.2-0.3C62,7.6,62,7.5,62.1,7.4c0.1-0.1,0.1-0.2,0.2-0.3c0.2-0.2,0.3-0.4,0.4-0.6 c0.2-0.2,0.3-0.4,0.4-0.6c0.2-0.2,0.3-0.4,0.4-0.6c0.2-0.2,0.3-0.4,0.4-0.5c0.2-0.2,0.3-0.3,0.4-0.5c0.1-0.1,0.1-0.2,0.2-0.2 C64.6,4,64.6,4,64.7,3.9c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0-0.1,0-0.1s-0.1,0.1-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.3 c-0.1,0.1-0.1,0.1-0.2,0.2s-0.1,0.2-0.2,0.2C64,4.7,63.8,4.8,63.7,5c-0.2,0.2-0.3,0.4-0.4,0.5c0,0.1-0.1,0.3-0.3,0.5 s-0.3,0.4-0.4,0.6c-0.2,0.2-0.3,0.4-0.4,0.6c-0.1,0.1-0.1,0.2-0.2,0.3c0.1,0.1,0,0.2,0,0.4c-0.1,0.1-0.1,0.2-0.2,0.3 c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.2-0.1,0.3v0.1 c0.7-0.2,3-0.9,4.2-2.7c1.4-2.2,0.8-5.2,0.8-5.2S63.3,2.1,61.9,4.2z"/> <path fill="#9BBD1E" d="M60,5.5c0.8,1.4,0.5,3.3,0.4,3.8c0,0,0,0,0-0.1S60.3,9.1,60.3,9c0-0.1-0.1-0.2-0.1-0.2 c-0.1-0.1-0.1-0.2-0.1-0.2s0-0.1-0.1-0.2c0-0.1,0-0.1-0.1-0.2S59.8,8,59.8,7.9c-0.1-0.1-0.1-0.2-0.1-0.3 c-0.1-0.2-0.2-0.3-0.3-0.5s-0.2-0.3-0.3-0.5s-0.2-0.3-0.3-0.5s-0.2-0.3-0.3-0.4s-0.2-0.3-0.3-0.4s-0.1-0.1-0.1-0.2 c0,0.2-0.1,0.1-0.1,0.1C58,5.1,57.9,5,57.8,5c-0.1-0.1-0.2-0.2-0.2-0.2s0.1,0.1,0.2,0.2c0.1,0,0.1,0.1,0.2,0.2 c0,0.1,0,0.1,0.1,0.2s0.1,0.1,0.1,0.2c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.3,0.3,0.5 s0.2,0.3,0.3,0.5s0.2,0.3,0.3,0.5c0.1,0.1,0.1,0.2,0.1,0.3c0.1,0.1,0.1,0.2,0.1,0.3S60,8.7,60,8.8C60.1,8.9,60.1,9,60.1,9 L60,8.9v0.2l0.1,0.2c0,0,0,0,0,0.1c-0.6-0.2-2.2-0.8-3-2.2c-1-1.7-0.3-3.9-0.3-3.9S59,3.8,60,5.5z"/> </g> </g> </g> <g> <path fill="#1C1B1B" d="M0.2,23V5.4h2.2V21h9.8v2H0.2L0.2,23z"/> <path fill="#1C1B1B" d="M14.4,7.7V5h2.2v2.7H14.4z M14.4,23V10.1h2.2V23H14.4z"/> <path fill="#1C1B1B" d="M23.3,23.3c-0.6,0-1.2-0.1-1.7-0.3c-0.5-0.2-1-0.5-1.4-0.9s-0.7-0.8-0.9-1.3c-0.2-0.5-0.3-1-0.3-1.6 s0.2-1.1,0.4-1.6s0.6-0.9,1.1-1.2c0.5-0.4,1.1-0.6,1.8-0.8c0.7-0.2,1.4-0.3,2.2-0.3c0.6,0,1.2,0.1,1.9,0.2 c0.6,0.1,1.2,0.3,1.7,0.5v-1c0-1-0.3-1.9-0.9-2.5s-1.4-0.9-2.5-0.9c-1.3,0-2.7,0.5-4.1,1.5l-0.7-1.4c1.7-1.1,3.4-1.7,5-1.7 c1.7,0,3,0.5,4,1.3c0.9,0.9,1.4,2.2,1.4,3.8v5.4c0,0.5,0.2,0.8,0.7,0.8V23c-0.2,0.1-0.4,0.1-0.6,0.1s-0.3,0-0.5,0 c-0.4,0-0.8-0.1-1-0.4s-0.4-0.6-0.5-0.9l-0.1-0.9c-0.6,0.8-1.3,1.3-2.2,1.8C25.3,23.1,24.4,23.3,23.3,23.3z M23.9,21.7 c0.8,0,1.5-0.2,2.2-0.4c0.7-0.3,1.2-0.7,1.5-1.1c0.3-0.3,0.5-0.6,0.5-1v-1.9c-1-0.4-2.2-0.6-3.3-0.6c-1.1,0-2,0.2-2.7,0.7 s-1,1.1-1,1.8c0,0.4,0.1,0.7,0.2,1c0.2,0.3,0.4,0.6,0.6,0.8c0.3,0.2,0.6,0.4,0.9,0.6C23.2,21.6,23.5,21.7,23.9,21.7z"/> <path fill="#1C1B1B" d="M53.2,23H51v-7.2c0-1.3-0.2-2.4-0.7-3c-0.4-0.6-1.1-1-2-1s-1.7,0.3-2.4,0.9c-0.7,0.6-1.2,1.4-1.5,2.5V23 h-2.2v-7.2c0-1.4-0.2-2.4-0.6-3c-0.4-0.6-1.1-0.9-1.9-0.9c-0.9,0-1.7,0.3-2.4,0.9c-0.7,0.6-1.2,1.4-1.5,2.5V23h-2.2V10.1h2v2.8 c0.5-1,1.2-1.7,2.1-2.2c0.8-0.5,1.8-0.8,2.8-0.8c1.1,0,2,0.3,2.6,0.9c0.6,0.6,1,1.3,1.2,2.3c1.1-2.1,2.8-3.1,5-3.1 c0.7,0,1.3,0.2,1.9,0.4c0.5,0.3,0.9,0.7,1.2,1.1c0.3,0.5,0.5,1.1,0.6,1.7c0.1,0.6,0.2,1.4,0.2,2.2L53.2,23L53.2,23z"/> <path fill="#1C1B1B" d="M80.4,23h-2.2v-7.2c0-1.4-0.2-2.4-0.6-3c-0.4-0.6-1.1-0.9-1.9-0.9c-0.5,0-0.9,0.1-1.3,0.3 c-0.5,0.2-0.9,0.4-1.2,0.7c-0.4,0.3-0.7,0.7-1,1.1c-0.3,0.4-0.5,0.9-0.7,1.3V23h-2.2V10.1h2v2.8c0.5-0.9,1.2-1.7,2.2-2.2 c1-0.6,2-0.8,3.1-0.8c0.7,0,1.3,0.2,1.9,0.4c0.5,0.3,0.9,0.7,1.2,1.1c0.3,0.5,0.5,1.1,0.6,1.7c0.1,0.6,0.2,1.4,0.2,2.2L80.4,23 L80.4,23z"/> <path fill="#1C1B1B" d="M89.5,23.3c-1,0-1.9-0.2-2.7-0.5c-0.8-0.4-1.5-0.8-2.1-1.4s-1-1.3-1.3-2.2c-0.3-0.8-0.5-1.7-0.5-2.6 s0.2-1.8,0.5-2.6s0.8-1.5,1.3-2.1c0.6-0.6,1.3-1.1,2.1-1.4c0.8-0.4,1.7-0.5,2.7-0.5s1.9,0.2,2.7,0.6s1.5,0.8,2.1,1.4 c0.6,0.6,1,1.3,1.3,2.1s0.5,1.7,0.5,2.5c0,0.2,0,0.4,0,0.5c0,0.2,0,0.3-0.1,0.4H85.3c0.1,0.6,0.2,1.2,0.5,1.8c0.3,0.5,0.6,1,1,1.3 s0.8,0.7,1.3,0.9c0.5,0.2,1,0.3,1.6,0.3c0.4,0,0.8-0.1,1.2-0.2c0.4-0.1,0.7-0.3,1.1-0.4c0.3-0.2,0.6-0.4,0.9-0.7 c0.3-0.3,0.5-0.6,0.6-0.9l1.9,0.5c-0.2,0.5-0.5,0.9-0.9,1.3s-0.8,0.7-1.3,1s-1,0.5-1.6,0.7C90.7,23.2,90.1,23.3,89.5,23.3z M93.9,15.7c-0.1-0.6-0.2-1.2-0.5-1.7s-0.6-1-1-1.3c-0.4-0.4-0.8-0.7-1.3-0.9s-1-0.3-1.7-0.3s-1.1,0.1-1.7,0.3s-1,0.5-1.3,0.9 C86,13,85.7,13.5,85.5,14c-0.3,0.5-0.4,1.1-0.4,1.7H93.9z"/> </g> </g> <g id="agence-digitale"> <path fill="#1C1B1B" d="M4.1,27.9l2.8,6.5h-1l-0.8-2H2l-0.8,2h-1L3,27.9C3,27.9,4.1,27.9,4.1,27.9z M4.7,31.8l-1.2-3l0,0l-1.2,3 H4.7z"/> <path fill="#1C1B1B" d="M12.5,34.3c-0.4,0.2-0.9,0.2-1.3,0.2c-0.6,0-1-0.1-1.5-0.3c-0.4-0.2-0.8-0.4-1.1-0.7s-0.5-0.7-0.7-1.1 c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.5,0.1-0.9,0.2-1.4C8,29.4,8.2,29,8.5,28.7c0.3-0.3,0.7-0.6,1.1-0.8c0.4-0.2,0.9-0.3,1.5-0.3 c0.4,0,0.8,0.1,1.1,0.1c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,1h-1c-0.1-0.3-0.2-0.5-0.3-0.7 c-0.2-0.2-0.3-0.3-0.5-0.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.3-0.1-0.5-0.1-0.8-0.1c-0.5,0-0.8,0.1-1.1,0.3c-0.3,0.2-0.6,0.4-0.8,0.6 c-0.2,0.3-0.4,0.6-0.5,0.9c-0.1,0.4-0.2,0.7-0.2,1s0.1,0.7,0.2,1c0.1,0.3,0.3,0.6,0.5,0.8c0.2,0.3,0.5,0.5,0.8,0.6 c0.3,0.2,0.7,0.2,1.1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.7-0.5c0.2-0.2,0.4-0.4,0.5-0.7s0.2-0.6,0.2-0.8H11v-0.7h3.2v3.4 h-0.6l-0.3-0.8C13.4,34,13,34.2,12.5,34.3z"/> <path fill="#1C1B1B" d="M21.5,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5L21.5,27.9L21.5,27.9z"/> <path fill="#1C1B1B" d="M24.3,27.9l3.8,5.3l0,0v-5.3H29v6.5h-1.1l-3.8-5.2l0,0v5.2h-0.9v-6.5C23.2,27.9,24.3,27.9,24.3,27.9z"/> <path fill="#1C1B1B" d="M35.6,28.9c-0.4-0.3-0.8-0.4-1.3-0.4s-0.8,0.1-1.1,0.2c-0.3,0.2-0.6,0.4-0.8,0.6s-0.4,0.5-0.5,0.9 c-0.1,0.3-0.2,0.7-0.2,1c0,0.4,0.1,0.7,0.2,1.1c0.1,0.4,0.3,0.6,0.5,0.9s0.5,0.5,0.8,0.6c0.3,0.2,0.7,0.2,1.1,0.2 c0.3,0,0.6-0.1,0.9-0.2c0.3-0.1,0.5-0.2,0.7-0.4s0.3-0.4,0.4-0.6c0.1-0.3,0.2-0.5,0.2-0.8h1c-0.1,0.8-0.4,1.5-1,1.9 c-0.6,0.5-1.3,0.7-2.2,0.7c-0.6,0-1.1-0.1-1.5-0.3s-0.8-0.4-1.1-0.7c-0.3-0.3-0.5-0.7-0.6-1.1c-0.2-0.4-0.2-0.9-0.2-1.3 c0-0.5,0.1-0.9,0.2-1.3c0.2-0.4,0.4-0.8,0.7-1.1c0.3-0.3,0.7-0.6,1.1-0.7c0.4-0.2,0.9-0.3,1.5-0.3c0.4,0,0.8,0.1,1.1,0.2 c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,0.9h-1C36.2,29.4,35.9,29.1,35.6,28.9z"/> <path fill="#1C1B1B" d="M44.2,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5L44.2,27.9L44.2,27.9z"/> <path fill="#1C1B1B" d="M51.8,27.9c1.1,0,2,0.3,2.6,0.8s0.9,1.3,0.9,2.3c0,0.6-0.1,1-0.2,1.5c-0.2,0.4-0.4,0.8-0.6,1.1 c-0.3,0.3-0.7,0.5-1.1,0.7c-0.5,0.2-1,0.3-1.6,0.3h-2.5v-6.5h2.5V27.9z M51.9,33.7c0.1,0,0.3,0,0.4,0s0.4-0.1,0.5-0.1 c0.2-0.1,0.4-0.2,0.6-0.3c0.2-0.1,0.4-0.3,0.5-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.2-0.6,0.2-1s-0.1-0.8-0.2-1.1 c-0.1-0.3-0.2-0.6-0.4-0.8c-0.2-0.2-0.5-0.4-0.8-0.5s-0.7-0.2-1.1-0.2h-1.6v5.1L51.9,33.7L51.9,33.7z"/> <path fill="#1C1B1B" d="M58.1,27.9v6.5h-1v-6.5C57.1,27.9,58.1,27.9,58.1,27.9z"/> <path fill="#1C1B1B" d="M64.7,34.3c-0.4,0.2-0.9,0.2-1.3,0.2c-0.6,0-1-0.1-1.5-0.3s-0.8-0.4-1.1-0.7s-0.5-0.7-0.7-1.1 c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.5,0.1-0.9,0.2-1.4c0.2-0.4,0.4-0.8,0.7-1.1c0.3-0.3,0.7-0.6,1.1-0.8c0.4-0.2,0.9-0.3,1.5-0.3 c0.4,0,0.8,0.1,1.1,0.1c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,1h-1c-0.1-0.3-0.2-0.5-0.3-0.7 c-0.2-0.2-0.3-0.3-0.5-0.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.3-0.1-0.5-0.1-0.8-0.1c-0.5,0-0.8,0.1-1.1,0.3s-0.6,0.4-0.8,0.6 c-0.2,0.3-0.4,0.6-0.5,0.9c-0.1,0.4-0.2,0.7-0.2,1s0.1,0.7,0.2,1c0.1,0.3,0.3,0.6,0.5,0.8c0.2,0.3,0.5,0.5,0.8,0.6 c0.3,0.2,0.7,0.2,1.1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.8-0.5c0.2-0.2,0.4-0.4,0.5-0.7s0.2-0.6,0.2-0.8h-2.3v-0.7h3.2v3.4 H66l-0.3-0.8C65.5,34,65.1,34.2,64.7,34.3z"/> <path fill="#1C1B1B" d="M69.6,27.9v6.5h-1v-6.5C68.6,27.9,69.6,27.9,69.6,27.9z"/> <path fill="#1C1B1B" d="M71.1,28.7V28h5.8v0.7h-2.4v5.8h-1v-5.8H71.1z"/> <path fill="#1C1B1B" d="M80.4,27.9l2.8,6.5h-1.1l-0.8-2h-3l-0.8,2h-1l2.8-6.5C79.3,27.9,80.4,27.9,80.4,27.9z M81,31.8l-1.2-3l0,0 l-1.2,3H81z"/> <path fill="#1C1B1B" d="M85.5,27.9v5.8h3.8v0.7h-4.8v-6.5L85.5,27.9L85.5,27.9z"/> <path fill="#1C1B1B" d="M95.8,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5L95.8,27.9L95.8,27.9z"/> </g> </svg>',
			liamoneLogoHome: '<svg version="1.1" id="liamone-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 36" xml:space="preserve" width="96" height="36"> <title>Liamone agence digitale</title> <g id="liamone"> <g> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-148.8634" y1="100.3365" x2="-137.6216" y2="100.3365" gradientTransform="matrix(1.1878 0 0 -1.1878 231.1475 135.4628)"> <stop  offset="0" style="stop-color:#FFD300"/> <stop  offset="1" style="stop-color:#F39200"/> </linearGradient> <path fill="url(#SVGID_1_)" d="M54.7,17.6c0.6,1.3,1.5,2.5,2.7,3c1.2,0.6,2.5,0.6,3.7,0.2c1.2-0.4,2.3-1.1,2.8-2.1 c0.3-0.5,0.5-0.9,0.5-1.3c0-0.2,0-0.4-0.1-0.6c-0.1-0.3-0.2-0.5-0.3-0.7c-0.4-0.9-1.2-1.5-2.2-1.8c-0.9-0.3-1.9-0.2-2.3-0.1 c-0.2,0.1-0.3,0-0.4,0.2c-0.2,0.2-0.2,0.6-0.2,1.1c0.2,0.9,0.8,1.9,2.4,2l0.2,0.4C61,18.5,60,18.8,59,18.7c-1-0.2-2-0.8-2.6-1.7 c-0.6-0.8-1-2-1-3.2c0.1-0.6,0.3-1.3,0.6-1.9c0.4-0.6,0.9-1.1,1.4-1.4c0.3-0.2,0.5-0.3,0.9-0.5c0.2-0.1,0.2-0.1,0.4-0.2 c0.2-0.1,0.3-0.1,0.4-0.1c0.6-0.2,1.1-0.2,1.7-0.2c1.1,0,2.1,0.3,3,0.8c1.8,0.9,3.2,2.6,3.8,4.5c0.2,0.5,0.2,1,0.3,1.4 c0.1,0.5,0,1.1-0.1,1.6c-0.2,1-0.7,2-1.4,2.6c-1.3,1.4-3,2.1-4.7,2.4c-1.7,0.2-3.5-0.2-4.8-1.2c-1.3-1-2.1-2.6-2.4-4L54.7,17.6z"/> <g> <g> <path fill="#628C2E" d="M61.9,4.2c-1.2,1.9-0.9,4.3-0.8,5V9.2c0.1-0.1,0.1-0.2,0.1-0.3s0.1-0.2,0.1-0.3s0.1-0.2,0.2-0.3 c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.2,0.2-0.3c0.2-0.2,0.3-0.4,0.4-0.6 c0.2-0.2,0.3-0.4,0.4-0.6c0.2-0.2,0.3-0.4,0.4-0.6c0.2-0.2,0.3-0.4,0.4-0.5c0.2-0.2,0.3-0.3,0.4-0.5c0.1-0.1,0.1-0.2,0.2-0.2 c0.1-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.2-0.2,0.3-0.3C65,3.6,65,3.5,65,3.5s-0.1,0.1-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.3 c-0.1,0.1-0.1,0.1-0.2,0.2c-0.1,0.1-0.1,0.2-0.2,0.2c-0.1,0.2-0.3,0.3-0.4,0.5c-0.2,0.2-0.3,0.4-0.4,0.5C63.3,5.6,63.2,5.8,63,6 c-0.2,0.2-0.3,0.4-0.4,0.6c-0.2,0.2-0.3,0.4-0.4,0.6c-0.1,0.1-0.1,0.2-0.2,0.3C62.1,7.6,62,7.7,62,7.9c-0.1,0.1-0.1,0.2-0.2,0.3 c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.2-0.1,0.3v0.1 c0.7-0.2,3-0.9,4.2-2.7c1.4-2.2,0.8-5.2,0.8-5.2S63.3,2.1,61.9,4.2z"/> <path fill="#9BBD1E" d="M60,5.5c0.8,1.4,0.5,3.3,0.4,3.8c0,0,0,0,0-0.1c0-0.1-0.1-0.1-0.1-0.2c0-0.1-0.1-0.2-0.1-0.2 c-0.1-0.1-0.1-0.2-0.1-0.2S60.1,8.5,60,8.4C60,8.3,60,8.3,59.9,8.2S59.8,8,59.8,7.9c-0.1-0.1-0.1-0.2-0.1-0.3 c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.2-0.2-0.3-0.3-0.4 c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.1-0.1-0.1-0.1-0.2C58.1,5.3,58,5.2,58,5.2C58,5.1,57.9,5,57.8,5c-0.1-0.1-0.2-0.2-0.2-0.2 s0.1,0.1,0.2,0.2C57.9,5,57.9,5.1,58,5.2C58,5.3,58,5.3,58.1,5.4c0.1,0.1,0.1,0.1,0.1,0.2c0.1,0.1,0.2,0.3,0.3,0.4 c0.1,0.2,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.3,0.3,0.5c0.1,0.2,0.2,0.3,0.3,0.5c0.1,0.2,0.2,0.3,0.3,0.5c0.1,0.1,0.1,0.2,0.1,0.3 c0.1,0.1,0.1,0.2,0.1,0.3s0.1,0.2,0.1,0.3c0.1,0.1,0.1,0.2,0.1,0.2S60,8.9,60,8.9S60,9.1,60,9.1s0.1,0.2,0.1,0.2c0,0,0,0,0,0.1 c-0.6-0.2-2.2-0.8-3-2.2c-1-1.7-0.3-3.9-0.3-3.9S59,3.8,60,5.5z"/> </g> </g> </g> <g> <path fill="#FFFFFF" d="M0.2,23V5.4h2.2V21h9.8v2L0.2,23L0.2,23z"/> <path fill="#FFFFFF" d="M14.4,7.7V5h2.2v2.7H14.4z M14.4,23V10.1h2.2V23H14.4z"/> <path fill="#FFFFFF" d="M23.3,23.3c-0.6,0-1.2-0.1-1.7-0.3c-0.5-0.2-1-0.5-1.4-0.9c-0.4-0.4-0.7-0.8-0.9-1.3 c-0.2-0.5-0.3-1-0.3-1.6c0-0.6,0.2-1.1,0.4-1.6s0.6-0.9,1.1-1.2c0.5-0.4,1.1-0.6,1.8-0.8c0.7-0.2,1.4-0.3,2.2-0.3 c0.6,0,1.2,0.1,1.9,0.2c0.6,0.1,1.2,0.3,1.7,0.5v-1c0-1-0.3-1.9-0.9-2.5c-0.6-0.6-1.4-0.9-2.5-0.9c-1.3,0-2.7,0.5-4.1,1.5 l-0.7-1.4c1.7-1.1,3.4-1.7,5-1.7c1.7,0,3,0.5,4,1.3c0.9,0.9,1.4,2.2,1.4,3.8v5.4c0,0.5,0.2,0.8,0.7,0.8V23 c-0.2,0.1-0.4,0.1-0.6,0.1c-0.2,0-0.3,0-0.5,0c-0.4,0-0.8-0.1-1-0.4s-0.4-0.6-0.5-0.9l-0.1-0.9c-0.6,0.8-1.3,1.3-2.2,1.8 C25.3,23.1,24.4,23.3,23.3,23.3z M23.9,21.7c0.8,0,1.5-0.2,2.2-0.4c0.7-0.3,1.2-0.7,1.5-1.1c0.3-0.3,0.5-0.6,0.5-1v-1.9 c-1-0.4-2.2-0.6-3.3-0.6c-1.1,0-2,0.2-2.7,0.7c-0.7,0.5-1,1.1-1,1.8c0,0.4,0.1,0.7,0.2,1c0.2,0.3,0.4,0.6,0.6,0.8 c0.3,0.2,0.6,0.4,0.9,0.6C23.2,21.6,23.5,21.7,23.9,21.7z"/> <path fill="#FFFFFF" d="M53.2,23h-2.2v-7.2c0-1.3-0.2-2.4-0.7-3c-0.4-0.6-1.1-1-2-1c-0.9,0-1.7,0.3-2.4,0.9 c-0.7,0.6-1.2,1.4-1.5,2.5V23h-2.2v-7.2c0-1.4-0.2-2.4-0.6-3c-0.4-0.6-1.1-0.9-1.9-0.9c-0.9,0-1.7,0.3-2.4,0.9 c-0.7,0.6-1.2,1.4-1.5,2.5V23h-2.2V10.1h2v2.8c0.5-1,1.2-1.7,2.1-2.2c0.8-0.5,1.8-0.8,2.8-0.8c1.1,0,2,0.3,2.6,0.9 c0.6,0.6,1,1.3,1.2,2.3c1.1-2.1,2.8-3.1,5-3.1c0.7,0,1.3,0.2,1.9,0.4c0.5,0.3,0.9,0.7,1.2,1.1c0.3,0.5,0.5,1.1,0.6,1.7 c0.1,0.6,0.2,1.4,0.2,2.2L53.2,23L53.2,23z"/> <path fill="#FFFFFF" d="M80.4,23h-2.2v-7.2c0-1.4-0.2-2.4-0.6-3c-0.4-0.6-1.1-0.9-1.9-0.9c-0.5,0-0.9,0.1-1.3,0.3 c-0.5,0.2-0.9,0.4-1.2,0.7c-0.4,0.3-0.7,0.7-1,1.1c-0.3,0.4-0.5,0.9-0.7,1.3V23h-2.2V10.1h2v2.8c0.5-0.9,1.2-1.7,2.2-2.2 c1-0.6,2-0.8,3.1-0.8c0.7,0,1.3,0.2,1.9,0.4c0.5,0.3,0.9,0.7,1.2,1.1c0.3,0.5,0.5,1.1,0.6,1.7c0.1,0.6,0.2,1.4,0.2,2.2L80.4,23 L80.4,23z"/> <path fill="#FFFFFF" d="M89.5,23.3c-1,0-1.9-0.2-2.7-0.5c-0.8-0.4-1.5-0.8-2.1-1.4s-1-1.3-1.3-2.2c-0.3-0.8-0.5-1.7-0.5-2.6 c0-0.9,0.2-1.8,0.5-2.6c0.3-0.8,0.8-1.5,1.3-2.1c0.6-0.6,1.3-1.1,2.1-1.4c0.8-0.4,1.7-0.5,2.7-0.5c1,0,1.9,0.2,2.7,0.6 s1.5,0.8,2.1,1.4c0.6,0.6,1,1.3,1.3,2.1c0.3,0.8,0.5,1.7,0.5,2.5c0,0.2,0,0.4,0,0.5c0,0.2,0,0.3-0.1,0.4H85.3 c0.1,0.6,0.2,1.2,0.5,1.8c0.3,0.5,0.6,1,1,1.3s0.8,0.7,1.3,0.9c0.5,0.2,1,0.3,1.6,0.3c0.4,0,0.8-0.1,1.2-0.2 c0.4-0.1,0.7-0.3,1.1-0.4c0.3-0.2,0.6-0.4,0.9-0.7c0.3-0.3,0.5-0.6,0.6-0.9l1.9,0.5c-0.2,0.5-0.5,0.9-0.9,1.3 c-0.4,0.4-0.8,0.7-1.3,1c-0.5,0.3-1,0.5-1.6,0.7C90.7,23.2,90.1,23.3,89.5,23.3z M93.9,15.7c-0.1-0.6-0.2-1.2-0.5-1.7 c-0.3-0.5-0.6-1-1-1.3c-0.4-0.4-0.8-0.7-1.3-0.9c-0.5-0.2-1-0.3-1.7-0.3s-1.1,0.1-1.7,0.3s-1,0.5-1.3,0.9C86,13,85.7,13.5,85.5,14 c-0.3,0.5-0.4,1.1-0.4,1.7H93.9z"/> </g> </g> <g id="agence-digitale"> <path fill="#FFFFFF" d="M4.1,27.9l2.8,6.5H5.9l-0.8-2H2l-0.8,2h-1l2.8-6.5H4.1z M4.7,31.8l-1.2-3l0,0l-1.2,3H4.7z"/> <path fill="#FFFFFF" d="M12.5,34.3c-0.4,0.2-0.9,0.2-1.3,0.2c-0.6,0-1-0.1-1.5-0.3c-0.4-0.2-0.8-0.4-1.1-0.7 c-0.3-0.3-0.5-0.7-0.7-1.1c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.5,0.1-0.9,0.2-1.4c0.2-0.4,0.4-0.8,0.7-1.1c0.3-0.3,0.7-0.6,1.1-0.8 c0.4-0.2,0.9-0.3,1.5-0.3c0.4,0,0.8,0.1,1.1,0.1c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,1h-1 c-0.1-0.3-0.2-0.5-0.3-0.7c-0.2-0.2-0.3-0.3-0.5-0.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.3-0.1-0.5-0.1-0.8-0.1c-0.5,0-0.8,0.1-1.1,0.3 c-0.3,0.2-0.6,0.4-0.8,0.6c-0.2,0.3-0.4,0.6-0.5,0.9c-0.1,0.4-0.2,0.7-0.2,1s0.1,0.7,0.2,1c0.1,0.3,0.3,0.6,0.5,0.8 c0.2,0.3,0.5,0.5,0.8,0.6c0.3,0.2,0.7,0.2,1.1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.7-0.5c0.2-0.2,0.4-0.4,0.5-0.7 c0.1-0.3,0.2-0.6,0.2-0.8h-2.3v-0.7h3.2v3.4h-0.6l-0.3-0.8C13.4,34,13,34.2,12.5,34.3z"/> <path fill="#FFFFFF" d="M21.5,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5h5V27.9z"/> <path fill="#FFFFFF" d="M24.3,27.9l3.8,5.3l0,0v-5.3H29v6.5h-1.1l-3.8-5.2l0,0v5.2h-0.9v-6.5H24.3z"/> <path fill="#FFFFFF" d="M35.6,28.9c-0.4-0.3-0.8-0.4-1.3-0.4c-0.5,0-0.8,0.1-1.1,0.2c-0.3,0.2-0.6,0.4-0.8,0.6s-0.4,0.5-0.5,0.9 c-0.1,0.3-0.2,0.7-0.2,1c0,0.4,0.1,0.7,0.2,1.1c0.1,0.4,0.3,0.6,0.5,0.9s0.5,0.5,0.8,0.6c0.3,0.2,0.7,0.2,1.1,0.2 c0.3,0,0.6-0.1,0.9-0.2c0.3-0.1,0.5-0.2,0.7-0.4c0.2-0.2,0.3-0.4,0.4-0.6c0.1-0.3,0.2-0.5,0.2-0.8h1c-0.1,0.8-0.4,1.5-1,1.9 c-0.6,0.5-1.3,0.7-2.2,0.7c-0.6,0-1.1-0.1-1.5-0.3c-0.4-0.2-0.8-0.4-1.1-0.7c-0.3-0.3-0.5-0.7-0.6-1.1c-0.2-0.4-0.2-0.9-0.2-1.3 c0-0.5,0.1-0.9,0.2-1.3c0.2-0.4,0.4-0.8,0.7-1.1c0.3-0.3,0.7-0.6,1.1-0.7c0.4-0.2,0.9-0.3,1.5-0.3c0.4,0,0.8,0.1,1.1,0.2 c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,0.9h-1C36.2,29.4,35.9,29.1,35.6,28.9z"/> <path fill="#FFFFFF" d="M44.2,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5h5V27.9z"/> <path fill="#FFFFFF" d="M51.8,27.9c1.1,0,2,0.3,2.6,0.8c0.6,0.5,0.9,1.3,0.9,2.3c0,0.6-0.1,1-0.2,1.5c-0.2,0.4-0.4,0.8-0.6,1.1 c-0.3,0.3-0.7,0.5-1.1,0.7c-0.5,0.2-1,0.3-1.6,0.3h-2.5v-6.5H51.8z M51.9,33.7c0.1,0,0.3,0,0.4,0s0.4-0.1,0.5-0.1 c0.2-0.1,0.4-0.2,0.6-0.3c0.2-0.1,0.4-0.3,0.5-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.2-0.6,0.2-1c0-0.4-0.1-0.8-0.2-1.1 c-0.1-0.3-0.2-0.6-0.4-0.8c-0.2-0.2-0.5-0.4-0.8-0.5c-0.3-0.1-0.7-0.2-1.1-0.2h-1.6v5.1L51.9,33.7L51.9,33.7z"/> <path fill="#FFFFFF" d="M58.1,27.9v6.5h-1v-6.5H58.1z"/> <path fill="#FFFFFF" d="M64.7,34.3c-0.4,0.2-0.9,0.2-1.3,0.2c-0.6,0-1-0.1-1.5-0.3s-0.8-0.4-1.1-0.7c-0.3-0.3-0.5-0.7-0.7-1.1 c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.5,0.1-0.9,0.2-1.4c0.2-0.4,0.4-0.8,0.7-1.1c0.3-0.3,0.7-0.6,1.1-0.8c0.4-0.2,0.9-0.3,1.5-0.3 c0.4,0,0.8,0.1,1.1,0.1c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,1h-1c-0.1-0.3-0.2-0.5-0.3-0.7 c-0.2-0.2-0.3-0.3-0.5-0.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.3-0.1-0.5-0.1-0.8-0.1c-0.5,0-0.8,0.1-1.1,0.3s-0.6,0.4-0.8,0.6 c-0.2,0.3-0.4,0.6-0.5,0.9c-0.1,0.4-0.2,0.7-0.2,1s0.1,0.7,0.2,1c0.1,0.3,0.3,0.6,0.5,0.8c0.2,0.3,0.5,0.5,0.8,0.6 c0.3,0.2,0.7,0.2,1.1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.8-0.5c0.2-0.2,0.4-0.4,0.5-0.7c0.1-0.3,0.2-0.6,0.2-0.8h-2.3v-0.7 h3.2v3.4H66l-0.3-0.8C65.5,34,65.1,34.2,64.7,34.3z"/> <path fill="#FFFFFF" d="M69.6,27.9v6.5h-1v-6.5H69.6z"/> <path fill="#FFFFFF" d="M71.1,28.7V28h5.8v0.7h-2.4v5.8h-1v-5.8H71.1z"/> <path fill="#FFFFFF" d="M80.4,27.9l2.8,6.5h-1.1l-0.8-2h-3l-0.8,2h-1l2.8-6.5H80.4z M81,31.8l-1.2-3l0,0l-1.2,3H81z"/> <path fill="#FFFFFF" d="M85.5,27.9v5.8h3.8v0.7h-4.8v-6.5L85.5,27.9L85.5,27.9z"/> <path fill="#FFFFFF" d="M95.8,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5h5V27.9z"/> </g> </svg>'
	
	};

	var init = {

		/*HOME*/
		headerfooter: function() {

			console.log('Header & Footer chargé');

			$('.menu-top a, .menu-bottom a').on('click', function(e) {

				var rel = $(this).prop('rel');

				if( rel === 'external')  {return;}

				e.preventDefault();

				var target = $(this),
					targetUrl = target.attr('href');

				if( $('body').hasClass('menu-open') ) {

					$('.menu-toggle').trigger('click').delay(150).queue(function() {

						ajaxNav.loadPage(targetUrl);
						history.pushState({page:targetUrl}, null, targetUrl);
						$(this).dequeue();

					});

				}
				else {

					ajaxNav.loadPage(targetUrl);
					history.pushState({page:targetUrl}, null, targetUrl);

				}

				controller.scrollTo(0);

			});

		},
		home: function() {

			console.log('Accueil chargé');
			pageAnimation.home();
			init3DScene()

			//HOMEPAGE FUNCTIONS
			$('main.home .cta-scroll').on('click', function(e) {

				e.preventDefault();
				controller.scrollTo('.liamone');
			
			});

			//Actus cards toggle & hide
			if (actuCard.length > 7 )  {

				actuCard.slice(7).hide();
				initFunctions.toggleActus(actuCard);

			}

		},
		/*PROJECTS*/
		projects: function() {

			console.log('Page Projets');

			$('#top-menu li:first-of-type').addClass('activ-page');

			$('.projects-list .project-item').on('click', '.link-toProject', function(e) {

				e.preventDefault();
				currentItem = $(this).parent().parent(),
				itemPosTop = currentItem.get[0].getBoundingClientRect(),
				itemPosLeft = initFunctions.calculatePosition(currentItem).left,
				itemClone = currentItem.clone();

				console.log(itemPosTop);

				var singleUrl = currentItem.find('.btn').attr('href');
				history.pushState({page:singleUrl}, null, singleUrl);

				TweenMax.to(currentItem.find('.project-link'), 0.3, {autoAlpha: 0, ease: Linear.easeNone, onComplete: function() {

						itemClone.addClass('project-clone').css({

							position: 'fixed',
							height: currentItem.outerHeight(),
							top: itemPosTop,
							left: itemPosLeft,
							zIndex: 800

						});

						TweenMax.set(itemClone, {left: itemScrollLeft, top: itemScrollTop} );
						TweenMax.to(itemClone, 0.5, { left: 0, top: 0, width: '100%', height: '100%', ease: Linear.easeNone} );
					
					} 

				} );

				$('body').addClass('load-project').removeClass('loading');

				itemClone.appendTo('body').delay(20).queue(function() {

					$(this).addClass('is-active').delay(900).queue(function(){

						$.ajax({

							type: "GET",
							url: singleUrl,
							success: function(data) {

								var dataProject = $(data).find('.project-focus');
						   		TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}}); 
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

							}

						});

						$(this).dequeue();

					});

					$(this).dequeue();

				});

			});

			pageAnimation.projects();
			initFunctions.projectMask();
			
		},
		/*PROJECT*/
		projectFocus: function() {

			console.log('Détail du projet');

			pageAnimation.projectFocus();

			$('.project-focus .cta-scroll').on('click', function(e) {

				e.preventDefault();
				controller.scrollTo('.project-context');
			
			});

		},
		/*SERVICES*/
		services: function() {

			console.log('Page Services');

			$('#top-menu li:nth-of-type(2)').addClass('activ-page');
			pageAnimation.services();
			initFunctions.serviceSwiper();

			TweenLite.set( $('.services > section h2'), {autoAlpha: 0, x: '-50%'} );
			TweenLite.set( $('.services > section .dot'), {autoAlpha: 0, scale: 0} );
			TweenLite.set( $('.services > section ol'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.services > section .btn'), {autoAlpha: 0, y: '5%'} );
			TweenLite.set( $('.services > section img'), {autoAlpha: 0, y: '-10%'} );

			$('main.services > section').each(function() {
				
				var tlServicesSection = new TimelineLite();

				tlServicesSection
					.to( $(this).find('h2'), 0.8, {autoAlpha: 1, x: '+=50%', ease: Power2.easeOut}, 0 )
					.to( $(this).find('.dot'), 0.6, {autoAlpha: 1, scale: 1, ease: Power2.easeIn}, 0.2 )
					.to( $(this).find('ol'), 0.5, {autoAlpha: 1, y:'-=5%', ease: Power2.easeOut}, 0.4 )
					.to( $(this).find('.btn'), 0.4, {autoAlpha: 1, y: '-=5%', ease: Power2.easeOut}, 0.6 )
					.to( $(this).find('img'), 0.5, {autoAlpha: 1, y: '+=10%', ease: Power2.easeOut}, 0.8 );

				var focusSection = new ScrollMagic.Scene({

					triggerElement: this,
					offset: -200,
					triggerHook: 'onCenter',
					reverse: false,
					duration: 0

				})
				.setTween(tlServicesSection)
				.addTo(controller);

			});
			
		},
		/*TRAINING*/
		training: function() {	

			console.log('Page Formations');

			$('#top-menu li:nth-of-type(3)').addClass('activ-page');
			pageAnimation.training();
			initFunctions.trainingTabs();

		},
		/*JOBS*/
		jobs: function() {

			console.log('Page Jobs');

			$('#top-menu li:nth-of-type(4)').addClass('activ-page');
			pageAnimation.jobs();

		},
		/*JOB*/
		jobDetail: function() {

			console.log("Détail de l'annonce");

		},
		/*TEAM*/
		team: function() {

			console.log('Page Equipe');
			$('#top-menu li:nth-of-type(5)').addClass('activ-page');

		},
		/*CONTACT*/
		contact: function() {

			console.log('Page Contact');

			$('#top-menu li:last-of-type').addClass('activ-page');
			pageAnimation.contact();
			initFunctions.contactFormControls();

			if( typeof currentType !== undefined ) {

				initFunctions.demandIsType(currentType);
				initFunctions.showContactForm(currentType);
				currentType = undefined;

			}

		}

	};

	/*
	BUILD
	*/
	var ajaxNav = {

		build: function() {

			console.log("%cLiamone \u00a9 2017", "color: #ffc900;")

			var targetURL = $('main.page-container').data('page-href');
			history.pushState({page:targetURL}, null, targetURL);

			init.headerfooter();

			currentPage = $('main');
			var targetPageClass = currentPage.data('page-class');
			currentProjectClass = currentPage.data('project');

			$('body').addClass(targetPageClass).addClass(currentProjectClass).delay(800).queue(function(){

				controller.scrollTo(0);
				ajaxNav.initPage(targetPageClass);

				$(this).removeClass('loading').delay(800).queue(function() {

					$(this).addClass('loaded');
					$(this).dequeue();

				}).dequeue();

			});

			currentPageClass == targetPageClass;

			$(window).on('popstate', function(e) {

				var state = e.originalEvent.state;

				if( state ) {

					ajaxNav.loadPage(location.href);
					controller.scrollTo(0);

				}

			});

		},
		loadPage: function(url) {

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

							$('body').addClass(currentProjectClass);

						}

						controller.scrollTo(0);

						$('body').removeClass(currentPageClass)
								.addClass(targetPageClass)
								.delay(500).queue(function() {

							$(this).removeClass('loading').delay(600).queue(function() {

								$(this).addClass('loaded');
								$(this).dequeue();

							});

							ajaxNav.initPage(targetPageClass);
							$(this).dequeue();

						});

						currentPageClass = targetPageClass;

					}

				});

				$(this).dequeue();

			});
		
		},
		initPage: function(pageClass) {

			$('header.menu-top').removeClass('menu-home');

			if( $('main').hasClass('home') ) {

				$('header.menu-top').addClass('menu-home');

			};

			if( $('header.menu-top').is('.menu-home') ) {

				$('.menu-brand').find('svg').remove();
				$('.menu-brand').append(logo.liamoneLogoHome);
			
			}
			else {

				$('.menu-brand').find('svg').remove();
				$('.menu-brand').append(logo.liamoneLogo);

			};

			$('header.menu-top .activ-page').removeClass('activ-page');

			$('main a').on('click', function(e) {

				var rel = $(this).prop('rel');

				if( rel === 'external' ) { return; }

				if( $(this).hasClass('item-title') ) { return; }

				if( $(this).parent().is('.block-cta') && $('main').is('.services') ) {

					currentType = 'project';

				}
				else if( $(this).parent().is('.resume-cta') && $('main').is('.training') ) {

					currentType = 'training';

				}
				else if( $(this).parent().is('.black-card') && $('main').is('.job-detail') ) {

					currentType = 'contact';
				}	
				else {

					currentType = undefined;

				}

				e.preventDefault();
				var target = $(this),
					targetUrl = target.attr('href');

				ajaxNav.loadPage(targetUrl);
				history.pushState({page:targetUrl}, null, targetUrl);

			});

			switch(pageClass) {

				case 'home-page':
					init.home();
					break;
				case 'projects-page':
					init.projects();
					break;
				case 'projectFocus':
					init.projectFocus();
					break;
				case 'services-page':
					init.services();
					break;
				case 'training-page':
					init.training();
					break;
				case 'job-page':
					init.jobs();
					break;
				case 'team-page':
					init.team();
					break;
				case 'contact-page':
					init.contact();
					break;
				default:
					return;

			}

			initFunctions.loading();

		}

	};

	//In All case
	initFunctions.geoLayerShapes();

	//If history API is supported, call ajax navigation
	if ( window.history && window.history.pushState ) {
	
		ajaxNav.build();

	}
	//Else, no-ajax navigation
	else {

		siteNav();

	}

});
