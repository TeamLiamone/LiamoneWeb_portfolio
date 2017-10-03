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
    <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
    <link rel="manifest" href="img/favicon//manifest.json">
    <link rel="mask-icon" href="img/favicon//safari-pinned-tab.svg" color="#5bbad5">
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

