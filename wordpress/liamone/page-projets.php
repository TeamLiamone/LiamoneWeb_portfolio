<?php 
	
	/*
	Template name: Projets
	*/

get_header(); ?>

    <!--Liamone page container-->
    <main class="projects page-container fluid-container" data-page-title="Projets" data-page-class="projects-page" data-page-href="http://www.liamoneweb.fr/projets/">
        
        <header class="hero-grey">
            <div class="container">
                <div class="padded-block row">
                    <div class="left-block col-xxsm-12">
                        <div class="block-title">
                            <h1 class="hero-title">
                                    <span>Selection</span> 
                                    <br> 
                                    <span>de projets</span>
                                    <i class="dot">.</i>
                            </h1>
                            <hr class="separator">
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        <div class="projects-wrap container">

            <ul class="projects-list row">
            <?php
            /*
            while ( have_posts() ) : the_post();

                get_template_part( 'template-parts/page/content', 'page' );

            endwhile; // End of the loop.
            */

            $args = array(
                            'posts_per_page' => 10,
                            'cat' => 8,
                            'order' => 'DESC',
                            'orderby' => 'date'
                );

            $projects = new WP_Query( $args );

            if( $projects->have_posts() ) : 

                while ( $projects->have_posts() ) : $projects->the_post(); ?>

                    <li class="project-item <?php echo strtolower(the_title('', '', false)); ?> in-view col-xxsm-12">
                        <div class="project-link">
                            <h2><?php the_title(); ?></h2>
                            <p><?php the_excerpt(); ?></p>
                            <a class="btn link-toProject" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                                <span class="visible-text">Découvrir</span>
                                <i class="icon-right"></i>
                            </a>
                        </div>
                        <div class="project-cover">
                            <div class="mask link-toDetail link-toProject">
                                <div class="fade"></div>
                                <div class="media project-img"></div>
                            </div>
                        </div>
                    </li>

                <?php endwhile;  
                wp_reset_postdata(); ?>

            <?php else :

                while ( have_posts() ) : the_post();

                    get_template_part( 'template-parts/page/content', 'page' );

                endwhile; // End of the loop.?>
                
            <?php endif; ?>
            </ul>

        </div>

    </main>
    <!--./Liamone page container-->

<?php get_footer(); ?>