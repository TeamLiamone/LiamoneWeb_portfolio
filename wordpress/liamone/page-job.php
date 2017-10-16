<?php 
	
	/*
	Template name: Jobs
	*/

get_header(); ?>

    <!--Liamone page container-->
    <main class="jobs page-container fluid-container" data-page-title="Job" data-page-class="job">

        <header class="hero-grey">
            <div class="container">
                <div class="padded-block row">
                    <div class="left-block col-xxsm-12 col-sm-3">
                        <div class="block-title">
                            <h1 class="hero-title">
                                <span>Jobs<i class="dot">.</i></span>
                            </h1>
                            <hr class="separator">
                        </div>
                        <div class="block-content">
                            <p>Liamone est toujours à la recherche de talents !<br> Consultez les offres pour rejoindre l'équipe Liamone, nous avons déjà envie de vous rencontrer.
                            </p>
                        </div>
                    </div>
                    <div class="right-block col-xxsm-12 col-sm-8 col-sm-offset-1">
                        <img src="http://via.placeholder.com/666x444" alt="Rejoignez la Team Liamone !" width="666" height="444">
                    </div>
                </div>
            </div>
        </header>
        
        <!--Job content-->
        <section class="offers">
            <div class="container">
                <div class="padded-block row">
                    <div class="block-content col-xxsm-12">

            			<?php
            			while ( have_posts() ) : the_post();

            				get_template_part( 'template-parts/page/content', 'page' );

            			endwhile; // End of the loop.
            			?>

                    </div>
                </div>
            </div>
        </section>
        <!--./Job content-->
        
    </main>
    <!--./Liamone page container-->

<?php get_footer(); ?>