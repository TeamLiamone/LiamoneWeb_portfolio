<?php
/**
 * Displays top navigation
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.2
 */

?>

    <button class="menu-toggle" type="button">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
        <span class="sr-only">Afficher le menu</span>
    </button>
</div>

<nav class="menu-container col-xxsm-12 col-lg-9" aria-label="<?php esc_attr_e( 'Top Menu', 'twentyseventeen' ); ?>">

	<?php wp_nav_menu( array(
		'theme_location' => 'top',
		'menu_id'        => 'top-menu',
		'menu_class'	 => 'menu-nav',
		'container'		 => 'false'
	) ); ?>

</nav><!-- #site-navigation -->
