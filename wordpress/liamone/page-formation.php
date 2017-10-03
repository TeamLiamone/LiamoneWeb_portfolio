<?php 
	
	/*
	Template name: Formations
	*/

get_header(); ?>

    <!--Liamone page container-->
    <main class="training page-container fluid-container">
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
                                <span>Formations <br> web <i class="dot">.</i></span>
                            </h1>
                            <hr class="separator">
                        </div>
                        <div class="block-content">
                            <div class="left-block">                                
                                <p>Il y a en entreprise un réel besoin d’accroitre ses compétences dans le domaine du web, c’est pourquoi nous proposons de nombreuses formations dédiées aux technologies web et au web marketing.</p>
                            </div>
                            <div class="right-block">
                                <p>LIAMONE est un organisme de formation professionnelle déclaré sous le N°788 566 83400016 délivré par la DIRECCTE d’Ile de France.</p>
                            </div>
                        </div>
                    </div>
                    <div class="block-logo col-xxsm-12">
                        <div class="block-img html5-logo">
                        </div>
                        <div class="block-img css3-logo">
                        </div>
                        <div class="block-img bootstrap-logo">
                        </div>
                        <div class="block-img wordpress-logo">
                        </div>
                        <div class="block-img angular-logo">
                        </div>
                        <div class="block-img js-logo">
                        </div>
                        <div class="block-img drupal-logo">
                        </div>
                        <div class="block-img mysql-logo">
                        </div>
                        <div class="block-img php-logo">
                        </div>
                        <div class="block-img java-logo">
                        </div>
                    </div>
                    <div class="block-filter filter-btn col-xxsm-12">
                        <button class="btn bordered" type="button">Développement <i class="icon-right"></i></button>
                        <button class="btn bordered" type="button">Graphisme <i class="icon-right"></i></button>
                        <button class="btn bordered" type="button">E-marketing <i class="icon-right"></i></button>
                        <button class="btn bordered" type="button">Solutions open source <i class="icon-right"></i></button>
                    </div>

                    <div class="block-filter filter-select col-xxsm-12">
                        <select id="" class="form-field" name="sort-training" aria-required="false">
                            <option disabled="true" selected="true">Trier par</option>
                            <option value="dev">Développement</option>
                            <option value="graph">Graphisme</option>
                            <option value="emark">E-marketing</option>
                            <option value="openSource">Solutions open source</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>

        <section class="block-formation">
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