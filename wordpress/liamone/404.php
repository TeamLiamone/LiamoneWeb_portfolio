<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

    <!--Liamone page container-->
    <main class="error-404 page-container fluid-container" data-page-title="erreur-404" data-page-class="404-page" data-page-href="http://www.liamoneweb.fr/404/">

        <header class="hero-grey">
            <div class="container">
                <div class="padded-block row">
                    <div class="left-block col-xxsm-12">
                        <div class="block-title">
                            <h1 class="hero-title">
                                <span>404<i class="dot">.</i></span>
                            </h1>
                            <hr class="separator">
                        </div>
                        <div class="block-content clearfix">
                            <div class="left-block">
                                <p>WTF ?<br>
                                   <small>Vous avez trouvé notre 404...</small><br>     
                                </p>
                                <a class="nav-item" href="http://www.liamoneweb.fr" title="Accéder à la page d'accueil">Retourner à l'accueil</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section class="illustration-404">
        	<div class="bg-404"></div>
        </section>
    </main>
    <!--./Liamone page container-->

<?php get_footer();