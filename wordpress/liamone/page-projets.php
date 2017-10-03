<?php 
	
	/*
	Template name: Projets
	*/

get_header(); ?>

    <!--Liamone page container-->
    <main class="projects page-container fluid-container">

        <!--Geo layer-->
        <div id="geo-layer" class="parallax-geometry">
        </div>
        <!--./Geo layer-->
        
        <header class="hero-grey">
            <div class="container">
                <div class="padded-block row">
                    <div class="left-block col-xxsm-12">
                        <div class="block-title">
                            <h1 class="hero-title">
                                <span>Selection <br> de projets <i class="dot">.</i></span>
                            </h1>
                            <hr class="separator">
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        <div class="projects-wrap container">

			<?php
			while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/page/content', 'page' );

			endwhile; // End of the loop.
			?>

        </div>

    </main>
    <!--./Liamone page container-->

<?php get_footer(); ?>