/*
http://www.liamoneweb.fr/wp-content/themes/liamone/assets/
*/
/*Document*/
jQuery(document).ready(function($) {

	'use strict';

	//Timeline Max + Scroll magic
	var controller = new ScrollMagic.Controller({addIndicators: true}),
		masterTl = new TimelineMax({paused: true});


	//Functions utilities
	var liamoneBase = {


	}

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

	var tlProjects = new TimelineMax({paused: true}),
		tlProject = new TimelineMax({paused: true});

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

			console.log('Accueil chargé');

			$('.cta-scroll').on('click', function(e) {

				e.preventDefault();
				controller.scrollTo('.liamone');

				console.log('je click');
			
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

		//var targetUrl = $('main').data('href');


		$(window).on('popstate', function(e) {

			var state = event.originalEvent.state;

			if( state ) {

				loadPage(location.href);
				controller.scrollTo(0);

			}

		});

		init.headerfooter();

	};

	build();

	function loadPage(url) {

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

				console.log('Lien externe');
				return;

			}

			if( $(this).hasClass('item-title') ) {

				console.log('Formation, tab');
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