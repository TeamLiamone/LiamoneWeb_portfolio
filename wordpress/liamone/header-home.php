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
<html <?php language_attributes(); ?> class="no-js no-svg" dir="ltr">
<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="profile" href="http://gmpg.org/xfn/11">

	<meta name="description" content="Liamone est une agence digitale spécialisée dans la conception/refonte de site internet, la création de contenu, d'application mobile, le référencement.">
    <meta name="keywords" content="Agence Web, Digital, Communication, Web, Site internet, Direction artsitique, UX, UI, User experience, User Interface, Creation, Site, Stratégie, Publicité, Site événementiel, Design, Web design, Design mobile, Application,Responsive, Développement, Wordpress,Javascript, Versailles, Paris, France">
    <meta name="author" content="LIAMONE">
    <link rel="canonical" href="http://www.liamoneweb.fr/"/>
    <link rel="alternate" href="http://www.liamoneweb.fr"/>

    <!--Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700%7CRoboto:400,700" rel="stylesheet">

    <!--Favicon-->
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_theme_file_uri(); ?>/assets/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_theme_file_uri(); ?>/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_theme_file_uri(); ?>/assets/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="<?php echo get_theme_file_uri(); ?>/assets/img/favicon/manifest.json">
    <link rel="mask-icon" href="<?php echo get_theme_file_uri(); ?>/assets/img/favicon/safari-pinned-tab.svg" color="#5bbad5">
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

<body class="loading first">

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
        <span class="loader-icon">
            <svg version="1.1" id="logo-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 220 83" enable-background="new 0 0 220 83" xml:space="preserve" width="220" height="83">
                <title>Liamone, agence digitale</title>
                <g id="liamone">
                    <g>
                        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-148.8634" y1="-64.4275" x2="-137.6216" y2="-64.4275" gradientTransform="matrix(1.1878 0 0 1.1878 231.1475 92.702)">
                            <stop  offset="0" style="stop-color:#FFD300"/>
                            <stop  offset="1" style="stop-color:#F39200"/>
                        </linearGradient>
                        <path fill="url(#SVGID_1_)" d="M54.7,17.6c0.6,1.3,1.5,2.5,2.7,3c1.2,0.6,2.5,0.6,3.7,0.2s2.3-1.1,2.8-2.1
                            c0.3-0.5,0.5-0.9,0.5-1.3c0-0.2,0-0.4-0.1-0.6c-0.1-0.3-0.2-0.5-0.3-0.7c-0.4-0.9-1.2-1.5-2.2-1.8c-0.9-0.3-1.9-0.2-2.3-0.1
                            c-0.2,0.1-0.3,0-0.4,0.2c-0.2,0.2-0.2,0.6-0.2,1.1c0.2,0.9,0.8,1.9,2.4,2l0.2,0.4C61,18.5,60,18.8,59,18.7c-1-0.2-2-0.8-2.6-1.7
                            c-0.6-0.8-1-2-1-3.2c0.1-0.6,0.3-1.3,0.6-1.9c0.4-0.6,0.9-1.1,1.4-1.4c0.3-0.2,0.5-0.3,0.9-0.5c0.2-0.1,0.2-0.1,0.4-0.2
                            c0.2-0.1,0.3-0.1,0.4-0.1c0.6-0.2,1.1-0.2,1.7-0.2c1.1,0,2.1,0.3,3,0.8c1.8,0.9,3.2,2.6,3.8,4.5c0.2,0.5,0.2,1,0.3,1.4
                            c0.1,0.5,0,1.1-0.1,1.6c-0.2,1-0.7,2-1.4,2.6c-1.3,1.4-3,2.1-4.7,2.4c-1.7,0.2-3.5-0.2-4.8-1.2s-2.1-2.6-2.4-4H54.7z"/>
                        <g>
                            <g>
                                <path fill="#628C2E" d="M61.9,4.2c-1.2,1.9-0.9,4.3-0.8,5l0,0c0.1-0.1,0.1-0.2,0.1-0.3s0.1-0.2,0.1-0.3s0.1-0.2,0.2-0.3
                                    c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.2,0.2-0.3C62,7.6,62,7.5,62.1,7.4c0.1-0.1,0.1-0.2,0.2-0.3c0.2-0.2,0.3-0.4,0.4-0.6
                                    c0.2-0.2,0.3-0.4,0.4-0.6c0.2-0.2,0.3-0.4,0.4-0.6c0.2-0.2,0.3-0.4,0.4-0.5c0.2-0.2,0.3-0.3,0.4-0.5c0.1-0.1,0.1-0.2,0.2-0.2
                                    C64.6,4,64.6,4,64.7,3.9c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0-0.1,0-0.1s-0.1,0.1-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.3
                                    c-0.1,0.1-0.1,0.1-0.2,0.2s-0.1,0.2-0.2,0.2C64,4.7,63.8,4.8,63.7,5c-0.2,0.2-0.3,0.4-0.4,0.5c0,0.1-0.1,0.3-0.3,0.5
                                    s-0.3,0.4-0.4,0.6c-0.2,0.2-0.3,0.4-0.4,0.6c-0.1,0.1-0.1,0.2-0.2,0.3c0.1,0.1,0,0.2,0,0.4c-0.1,0.1-0.1,0.2-0.2,0.3
                                    c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.2-0.1,0.3v0.1
                                    c0.7-0.2,3-0.9,4.2-2.7c1.4-2.2,0.8-5.2,0.8-5.2S63.3,2.1,61.9,4.2z"/>
                                <path fill="#9BBD1E" d="M60,5.5c0.8,1.4,0.5,3.3,0.4,3.8c0,0,0,0,0-0.1S60.3,9.1,60.3,9c0-0.1-0.1-0.2-0.1-0.2
                                    c-0.1-0.1-0.1-0.2-0.1-0.2s0-0.1-0.1-0.2c0-0.1,0-0.1-0.1-0.2S59.8,8,59.8,7.9c-0.1-0.1-0.1-0.2-0.1-0.3
                                    c-0.1-0.2-0.2-0.3-0.3-0.5s-0.2-0.3-0.3-0.5s-0.2-0.3-0.3-0.5s-0.2-0.3-0.3-0.4s-0.2-0.3-0.3-0.4s-0.1-0.1-0.1-0.2
                                    c0,0.2-0.1,0.1-0.1,0.1C58,5.1,57.9,5,57.8,5c-0.1-0.1-0.2-0.2-0.2-0.2s0.1,0.1,0.2,0.2c0.1,0,0.1,0.1,0.2,0.2
                                    c0,0.1,0,0.1,0.1,0.2s0.1,0.1,0.1,0.2c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.3,0.3,0.5
                                    s0.2,0.3,0.3,0.5s0.2,0.3,0.3,0.5c0.1,0.1,0.1,0.2,0.1,0.3c0.1,0.1,0.1,0.2,0.1,0.3S60,8.7,60,8.8C60.1,8.9,60.1,9,60.1,9
                                    L60,8.9v0.2l0.1,0.2c0,0,0,0,0,0.1c-0.6-0.2-2.2-0.8-3-2.2c-1-1.7-0.3-3.9-0.3-3.9S59,3.8,60,5.5z"/>
                            </g>
                        </g>
                    </g>
                    <g>
                        <path fill="#1C1B1B" d="M0.2,23V5.4h2.2V21h9.8v2H0.2L0.2,23z"/>
                        <path fill="#1C1B1B" d="M14.4,7.7V5h2.2v2.7H14.4z M14.4,23V10.1h2.2V23H14.4z"/>
                        <path fill="#1C1B1B" d="M23.3,23.3c-0.6,0-1.2-0.1-1.7-0.3c-0.5-0.2-1-0.5-1.4-0.9s-0.7-0.8-0.9-1.3c-0.2-0.5-0.3-1-0.3-1.6
                            s0.2-1.1,0.4-1.6s0.6-0.9,1.1-1.2c0.5-0.4,1.1-0.6,1.8-0.8c0.7-0.2,1.4-0.3,2.2-0.3c0.6,0,1.2,0.1,1.9,0.2
                            c0.6,0.1,1.2,0.3,1.7,0.5v-1c0-1-0.3-1.9-0.9-2.5s-1.4-0.9-2.5-0.9c-1.3,0-2.7,0.5-4.1,1.5l-0.7-1.4c1.7-1.1,3.4-1.7,5-1.7
                            c1.7,0,3,0.5,4,1.3c0.9,0.9,1.4,2.2,1.4,3.8v5.4c0,0.5,0.2,0.8,0.7,0.8V23c-0.2,0.1-0.4,0.1-0.6,0.1s-0.3,0-0.5,0
                            c-0.4,0-0.8-0.1-1-0.4s-0.4-0.6-0.5-0.9l-0.1-0.9c-0.6,0.8-1.3,1.3-2.2,1.8C25.3,23.1,24.4,23.3,23.3,23.3z M23.9,21.7
                            c0.8,0,1.5-0.2,2.2-0.4c0.7-0.3,1.2-0.7,1.5-1.1c0.3-0.3,0.5-0.6,0.5-1v-1.9c-1-0.4-2.2-0.6-3.3-0.6c-1.1,0-2,0.2-2.7,0.7
                            s-1,1.1-1,1.8c0,0.4,0.1,0.7,0.2,1c0.2,0.3,0.4,0.6,0.6,0.8c0.3,0.2,0.6,0.4,0.9,0.6C23.2,21.6,23.5,21.7,23.9,21.7z"/>
                        <path fill="#1C1B1B" d="M53.2,23H51v-7.2c0-1.3-0.2-2.4-0.7-3c-0.4-0.6-1.1-1-2-1s-1.7,0.3-2.4,0.9c-0.7,0.6-1.2,1.4-1.5,2.5V23
                            h-2.2v-7.2c0-1.4-0.2-2.4-0.6-3c-0.4-0.6-1.1-0.9-1.9-0.9c-0.9,0-1.7,0.3-2.4,0.9c-0.7,0.6-1.2,1.4-1.5,2.5V23h-2.2V10.1h2v2.8
                            c0.5-1,1.2-1.7,2.1-2.2c0.8-0.5,1.8-0.8,2.8-0.8c1.1,0,2,0.3,2.6,0.9c0.6,0.6,1,1.3,1.2,2.3c1.1-2.1,2.8-3.1,5-3.1
                            c0.7,0,1.3,0.2,1.9,0.4c0.5,0.3,0.9,0.7,1.2,1.1c0.3,0.5,0.5,1.1,0.6,1.7c0.1,0.6,0.2,1.4,0.2,2.2L53.2,23L53.2,23z"/>
                        <path fill="#1C1B1B" d="M80.4,23h-2.2v-7.2c0-1.4-0.2-2.4-0.6-3c-0.4-0.6-1.1-0.9-1.9-0.9c-0.5,0-0.9,0.1-1.3,0.3
                            c-0.5,0.2-0.9,0.4-1.2,0.7c-0.4,0.3-0.7,0.7-1,1.1c-0.3,0.4-0.5,0.9-0.7,1.3V23h-2.2V10.1h2v2.8c0.5-0.9,1.2-1.7,2.2-2.2
                            c1-0.6,2-0.8,3.1-0.8c0.7,0,1.3,0.2,1.9,0.4c0.5,0.3,0.9,0.7,1.2,1.1c0.3,0.5,0.5,1.1,0.6,1.7c0.1,0.6,0.2,1.4,0.2,2.2L80.4,23
                            L80.4,23z"/>
                        <path fill="#1C1B1B" d="M89.5,23.3c-1,0-1.9-0.2-2.7-0.5c-0.8-0.4-1.5-0.8-2.1-1.4s-1-1.3-1.3-2.2c-0.3-0.8-0.5-1.7-0.5-2.6
                            s0.2-1.8,0.5-2.6s0.8-1.5,1.3-2.1c0.6-0.6,1.3-1.1,2.1-1.4c0.8-0.4,1.7-0.5,2.7-0.5s1.9,0.2,2.7,0.6s1.5,0.8,2.1,1.4
                            c0.6,0.6,1,1.3,1.3,2.1s0.5,1.7,0.5,2.5c0,0.2,0,0.4,0,0.5c0,0.2,0,0.3-0.1,0.4H85.3c0.1,0.6,0.2,1.2,0.5,1.8c0.3,0.5,0.6,1,1,1.3
                            s0.8,0.7,1.3,0.9c0.5,0.2,1,0.3,1.6,0.3c0.4,0,0.8-0.1,1.2-0.2c0.4-0.1,0.7-0.3,1.1-0.4c0.3-0.2,0.6-0.4,0.9-0.7
                            c0.3-0.3,0.5-0.6,0.6-0.9l1.9,0.5c-0.2,0.5-0.5,0.9-0.9,1.3s-0.8,0.7-1.3,1s-1,0.5-1.6,0.7C90.7,23.2,90.1,23.3,89.5,23.3z
                             M93.9,15.7c-0.1-0.6-0.2-1.2-0.5-1.7s-0.6-1-1-1.3c-0.4-0.4-0.8-0.7-1.3-0.9s-1-0.3-1.7-0.3s-1.1,0.1-1.7,0.3s-1,0.5-1.3,0.9
                            C86,13,85.7,13.5,85.5,14c-0.3,0.5-0.4,1.1-0.4,1.7H93.9z"/>
                    </g>
                </g>
                <g id="agence-digitale">
                    <path fill="#1C1B1B" d="M4.1,27.9l2.8,6.5h-1l-0.8-2H2l-0.8,2h-1L3,27.9C3,27.9,4.1,27.9,4.1,27.9z M4.7,31.8l-1.2-3l0,0l-1.2,3
                        H4.7z"/>
                    <path fill="#1C1B1B" d="M12.5,34.3c-0.4,0.2-0.9,0.2-1.3,0.2c-0.6,0-1-0.1-1.5-0.3c-0.4-0.2-0.8-0.4-1.1-0.7s-0.5-0.7-0.7-1.1
                        c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.5,0.1-0.9,0.2-1.4C8,29.4,8.2,29,8.5,28.7c0.3-0.3,0.7-0.6,1.1-0.8c0.4-0.2,0.9-0.3,1.5-0.3
                        c0.4,0,0.8,0.1,1.1,0.1c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,1h-1c-0.1-0.3-0.2-0.5-0.3-0.7
                        c-0.2-0.2-0.3-0.3-0.5-0.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.3-0.1-0.5-0.1-0.8-0.1c-0.5,0-0.8,0.1-1.1,0.3c-0.3,0.2-0.6,0.4-0.8,0.6
                        c-0.2,0.3-0.4,0.6-0.5,0.9c-0.1,0.4-0.2,0.7-0.2,1s0.1,0.7,0.2,1c0.1,0.3,0.3,0.6,0.5,0.8c0.2,0.3,0.5,0.5,0.8,0.6
                        c0.3,0.2,0.7,0.2,1.1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.7-0.5c0.2-0.2,0.4-0.4,0.5-0.7s0.2-0.6,0.2-0.8H11v-0.7h3.2v3.4
                        h-0.6l-0.3-0.8C13.4,34,13,34.2,12.5,34.3z"/>
                    <path fill="#1C1B1B" d="M21.5,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5L21.5,27.9L21.5,27.9z"/>
                    <path fill="#1C1B1B" d="M24.3,27.9l3.8,5.3l0,0v-5.3H29v6.5h-1.1l-3.8-5.2l0,0v5.2h-0.9v-6.5C23.2,27.9,24.3,27.9,24.3,27.9z"/>
                    <path fill="#1C1B1B" d="M35.6,28.9c-0.4-0.3-0.8-0.4-1.3-0.4s-0.8,0.1-1.1,0.2c-0.3,0.2-0.6,0.4-0.8,0.6s-0.4,0.5-0.5,0.9
                        c-0.1,0.3-0.2,0.7-0.2,1c0,0.4,0.1,0.7,0.2,1.1c0.1,0.4,0.3,0.6,0.5,0.9s0.5,0.5,0.8,0.6c0.3,0.2,0.7,0.2,1.1,0.2
                        c0.3,0,0.6-0.1,0.9-0.2c0.3-0.1,0.5-0.2,0.7-0.4s0.3-0.4,0.4-0.6c0.1-0.3,0.2-0.5,0.2-0.8h1c-0.1,0.8-0.4,1.5-1,1.9
                        c-0.6,0.5-1.3,0.7-2.2,0.7c-0.6,0-1.1-0.1-1.5-0.3s-0.8-0.4-1.1-0.7c-0.3-0.3-0.5-0.7-0.6-1.1c-0.2-0.4-0.2-0.9-0.2-1.3
                        c0-0.5,0.1-0.9,0.2-1.3c0.2-0.4,0.4-0.8,0.7-1.1c0.3-0.3,0.7-0.6,1.1-0.7c0.4-0.2,0.9-0.3,1.5-0.3c0.4,0,0.8,0.1,1.1,0.2
                        c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,0.9h-1C36.2,29.4,35.9,29.1,35.6,28.9z"/>
                    <path fill="#1C1B1B" d="M44.2,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5L44.2,27.9L44.2,27.9z"/>
                    <path fill="#1C1B1B" d="M51.8,27.9c1.1,0,2,0.3,2.6,0.8s0.9,1.3,0.9,2.3c0,0.6-0.1,1-0.2,1.5c-0.2,0.4-0.4,0.8-0.6,1.1
                        c-0.3,0.3-0.7,0.5-1.1,0.7c-0.5,0.2-1,0.3-1.6,0.3h-2.5v-6.5h2.5V27.9z M51.9,33.7c0.1,0,0.3,0,0.4,0s0.4-0.1,0.5-0.1
                        c0.2-0.1,0.4-0.2,0.6-0.3c0.2-0.1,0.4-0.3,0.5-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.2-0.6,0.2-1s-0.1-0.8-0.2-1.1
                        c-0.1-0.3-0.2-0.6-0.4-0.8c-0.2-0.2-0.5-0.4-0.8-0.5s-0.7-0.2-1.1-0.2h-1.6v5.1L51.9,33.7L51.9,33.7z"/>
                    <path fill="#1C1B1B" d="M58.1,27.9v6.5h-1v-6.5C57.1,27.9,58.1,27.9,58.1,27.9z"/>
                    <path fill="#1C1B1B" d="M64.7,34.3c-0.4,0.2-0.9,0.2-1.3,0.2c-0.6,0-1-0.1-1.5-0.3s-0.8-0.4-1.1-0.7s-0.5-0.7-0.7-1.1
                        c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.5,0.1-0.9,0.2-1.4c0.2-0.4,0.4-0.8,0.7-1.1c0.3-0.3,0.7-0.6,1.1-0.8c0.4-0.2,0.9-0.3,1.5-0.3
                        c0.4,0,0.8,0.1,1.1,0.1c0.4,0.1,0.7,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.4,1h-1c-0.1-0.3-0.2-0.5-0.3-0.7
                        c-0.2-0.2-0.3-0.3-0.5-0.5c-0.2-0.1-0.4-0.2-0.7-0.3c-0.3-0.1-0.5-0.1-0.8-0.1c-0.5,0-0.8,0.1-1.1,0.3s-0.6,0.4-0.8,0.6
                        c-0.2,0.3-0.4,0.6-0.5,0.9c-0.1,0.4-0.2,0.7-0.2,1s0.1,0.7,0.2,1c0.1,0.3,0.3,0.6,0.5,0.8c0.2,0.3,0.5,0.5,0.8,0.6
                        c0.3,0.2,0.7,0.2,1.1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.8-0.5c0.2-0.2,0.4-0.4,0.5-0.7s0.2-0.6,0.2-0.8h-2.3v-0.7h3.2v3.4
                        H66l-0.3-0.8C65.5,34,65.1,34.2,64.7,34.3z"/>
                    <path fill="#1C1B1B" d="M69.6,27.9v6.5h-1v-6.5C68.6,27.9,69.6,27.9,69.6,27.9z"/>
                    <path fill="#1C1B1B" d="M71.1,28.7V28h5.8v0.7h-2.4v5.8h-1v-5.8H71.1z"/>
                    <path fill="#1C1B1B" d="M80.4,27.9l2.8,6.5h-1.1l-0.8-2h-3l-0.8,2h-1l2.8-6.5C79.3,27.9,80.4,27.9,80.4,27.9z M81,31.8l-1.2-3l0,0
                        l-1.2,3H81z"/>
                    <path fill="#1C1B1B" d="M85.5,27.9v5.8h3.8v0.7h-4.8v-6.5L85.5,27.9L85.5,27.9z"/>
                    <path fill="#1C1B1B" d="M95.8,27.9v0.7h-4.1v2.1h3.7v0.7h-3.7v2.2h4.1v0.7h-5v-6.5L95.8,27.9L95.8,27.9z"/>
                </g>
            </svg>
        </span>
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