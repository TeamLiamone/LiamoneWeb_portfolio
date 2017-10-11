<?php 
	
	/*
	Template name: Mentions légales
	*/

get_header(); ?>

    <!--Liamone page container-->
    <main class="legal-notice fluid-container sponsoblog">

        <!--Geo layer-->
        <div id="geo-layer" class="parallax-geometry">
        </div>
        <!--./Geo layer-->

        <header class="hero-grey">
            <div class="container">
                <div class="padded-block row">
                    <div class="left-block col-xxsm-12 col-sm-3">
                        <div class="block-title">
                            <h1 class="hero-title">
                                <span>Mentions <br> légales<i class="dot">.</i></span>
                            </h1>
                            <hr class="separator">
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section class="notice-article">
            <div class="container">

    			<?php
    			while ( have_posts() ) : the_post();

    				get_template_part( 'template-parts/page/content', 'page' );

    			endwhile; // End of the loop.
    			?>

            </div>
        </section>

    </main>
    <!--./Liamone page container-->

<?php get_footer(); ?>