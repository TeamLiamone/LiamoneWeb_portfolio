<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

	<?php
	/* Start the Loop */
	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/post/content', get_post_format() );

		// If comments are open or we have at least one comment, load up the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;
		
		the_post_navigation( array(
			'prev_text' => '<span aria-hidden="false" class="btn-name">' . __( 'Précédent', 'twentyseventeen' ) . '</span> <span class="project-name">%title</span>' . '<span class="btn-ico"><i class="icon-left-1"></i></span>',
			'next_text' => '<span aria-hidden="false" class="btn-name">' . __( 'Suivant', 'twentyseventeen' ) . '</span> <span class="project-name">%title</span>' . '<span class="btn-ico"><i class="icon-right-1"></i></span>',
		) );

	endwhile; // End of the loop.
	?>

<?php get_footer();
