<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<meta name="description" content="Liamone est une agence digitale spécialisée dans la conception / refonte de site internet, la création d'application mobile, le référencement et la création de contenu digital.">
    <meta name="keywords" content="Agence Web, Digital, Communication, Web, Site internet, Direction artsitique, UX, UI, User experience, User Interface, Creation, Site, Stratégie, Publicité, Site événementiel, Design, Web design, Design mobile, Application,Responsive, Développement, Wordpress,Javascript, Versailles, Paris, France">
    <meta name="author" content="LIAMONE">
    <link rel="canonical" href="http://www.liamoneweb.com/"/>

    <!--Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700%7CRoboto:400,400i,700,700i" rel="stylesheet">

    <!--Favicon-->
    <link rel="apple-touch-icon" sizes="180x180" href="http://www.liamoneweb.com/wp-content/themes/liamone/assets/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="http://www.liamoneweb.com/wp-content/themes/liamone/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="http://www.liamoneweb.com/wp-content/themes/liamone/assets/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="http://www.liamoneweb.com/wp-content/themes/liamone/assets/img/favicon/manifest.json">
    <link rel="mask-icon" href="http://www.liamoneweb.com/wp-content/themes/liamone/assets/img/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">    

    <!--Facebook Share window-->
    <meta property="og:title" content="Liamone | Agence web à Versailles">
    <meta property="og:type" content="website">
    <meta property="og:url" content="www.liamoneweb.com">
    <meta property="og:description" content="Liamone est une agence digitale spécialisée dans la conception / refonte de site internet, la création d'application mobile, le référencement et la création de contenu digital.">
    <meta property="og:image" content="">

    <!--Twitter Share window-->
    <meta property="twitter:title" content="Liamone | Agence web à Versailles">
    <meta property="twitter:type" content="website">
    <meta property="twitter:url" content="www.liamoneweb.com">
    <meta property="twitter:description" content="Liamone est une agence digitale spécialisée dans la conception / refonte de site internet, la création d'application mobile, le référencement et la création de contenu digital.">
    <meta property="twitter:image" content="">

    <!--Swiper slider-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.min.css"> 
       
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <!--Liamone menu-->
	<header class="menu-top menu-home fluid-container">
        <div class="container">
            <div class="row">

				<?php get_template_part( 'template-parts/header/header', 'image' ); ?>

				<?php if ( has_nav_menu( 'top' ) ) : ?>
					<?php get_template_part( 'template-parts/navigation/navigation', 'top' ); ?>
				<?php endif; ?>

	</header>
    <!--./Liamone menu-->

    <!--Loader-->
    <div class="loader">
        <span class="loader-icon"></span>
    </div>
    <!--./Loader-->

    <!--Geo layer-->
    <div id="geo-layer" class="geometry-layer parallax-geometry">
        <svg version="1.1" id="geo-losange" class="shape losange" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 77 77" enable-background="new 0 0 77 77" xml:space="preserve" width="77" height="77">
            <polygon fill="none" stroke="#FFC200" stroke-width="1.5102" stroke-miterlimit="10" points="75.9,38.5 38.5,76.1 1,38.5 38.5,0.9"/>
        </svg>
        <svg version="1.1" id="geo-triangle" class="shape triangle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 77 77" enable-background="new 0 0 77 77" xml:space="preserve" width="77" height="77">
            <polygon fill="none" stroke="#FFC200" stroke-width="1.5102" stroke-miterlimit="10" points="75.4,76 1.9,76 38.5,1.8"/>
        </svg> 
        <svg version="1.1" id="geo-hexagon" class="shape hexagon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 77 77" enable-background="new 0 0 77 77" xml:space="preserve" width="77" height="77">
            <polygon fill="none" stroke="#FFC200" stroke-width="2" stroke-miterlimit="10" points="6,19.9 38.5,1.4 71,19.9 71,57.1 38.5,75.6 6,57.1 "/>
        </svg>            
        <svg version="1.1" id="geo-plus" class="shape plus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 77 77" enable-background="new 0 0 77 77" xml:space="preserve" width="77" height="77">
            <polygon fill="#FFC200" points="77,35 42.5,35 42.5,0 34.5,0 34.5,35 0,35 0,43 34.5,43 34.5,77 42.5,77 42.5,43 77,43"/>
        </svg> 
        <svg version="1.1" id="geo-distort" class="shape distort" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 77 77" enable-background="new 0 0 77 77" xml:space="preserve" width="77" height="77">
            <polygon fill="#FFC200" points="0,76.9 66.5,0 77,0 11.6,76.9"/>
        </svg>  
        <svg version="1.1" id="geo-wave" class="shape wave" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 77 77" enable-background="new 0 0 77 77" xml:space="preserve" width="77" height="77">
            <path fill="#FFC200" enable-background="new" d="M55.5,45.4c-1.5,0-5.3-0.5-8.5-5.3l0,0c0-0.1,0-0.1,0-0.1c-0.7-1.1-2-2.3-2.9-2.3c-0.7,0-1.6,0.7-2.4,1.8l-0.2,0.4c-0.3,0.6-3.4,5.6-8.5,5.6c-1.5,0-5.3-0.5-8.5-5.3l0,0c0-0.1,0-0.1,0-0.1c-0.7-1.1-2-2.3-2.9-2.3c-0.9,0-2,1.1-2.8,2.2l0,0c-0.5,0.9-3.5,5.5-8.4,5.5c-1.5,0-5.2-0.5-8.4-5.3l-1.7-2.4l5.5-3.5L7,35.6C7.2,35.8,7.3,36,7.4,36c0.7,1.1,2,2.3,2.9,2.3c0.9,0,2-1.1,2.8-2.2c0-0.1,0-0.1,0.1-0.2c1-1.7,3.9-5.4,8.3-5.4c1.5,0,5.3,0.5,8.5,5.3l0,0c0,0,0,0.1,0,0.1c0.7,1.1,2,2.3,2.9,2.3c0.7,0,1.6-0.7,2.4-1.8l0.2-0.4c0.3-0.6,3.4-5.6,8.5-5.6c1.5,0,5.3,0.5,8.5,5.3l0,0c0,0.1,0,0.1,0,0.1c0.7,1.1,2,2.3,2.9,2.3c0.9,0,2-1.1,2.8-2.2l0,0c0.5-0.9,3.5-5.5,8.4-5.5c1.5,0,5.3,0.5,8.5,5.3l1.7,2.4l-5.5,3.5l-1.5-1.5c-0.1-0.2-0.3-0.4-0.3-0.4c-0.7-1.1-2-2.3-2.9-2.3c-0.9,0-2,1.1-2.8,2.2c0,0,0,0.1,0,0.1C63.2,41.2,60.2,45.4,55.5,45.4z"/>
        </svg>        
    </div>
    <!--./Geo layer-->

    <!--Page content-->
    <div class="content-container">
        
	<?php

	/*
	 * If a regular post or page, and not the front page, show the featured image.
	 * Using get_queried_object_id() here since the $post global may not be set before a call to the_post().
	 */
	if ( ( is_single() || ( is_page() && ! twentyseventeen_is_frontpage() ) ) && has_post_thumbnail( get_queried_object_id() ) ) :
		echo '<div class="single-featured-image-header">';
		echo get_the_post_thumbnail( get_queried_object_id(), 'twentyseventeen-featured-image' );
		echo '</div><!-- .single-featured-image-header -->';
	endif;
	?>

