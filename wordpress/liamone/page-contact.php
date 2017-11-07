<?php
    /*
    Template name: Contact
    */
get_header(); ?>

    <!--Liamone page container-->
    <main class="contact page-container fluid-container" data-page-title="Contact" data-page-class="contact-page" data-page-href="http://www.liamoneweb.fr/contact/">
        
        <header class="hero-grey">
            <div class="container">
                <div class="padded-block row">
                    <div class="left-block col-xxsm-12">
                        <div class="block-title">
                            <h1 class="hero-title">
                                <span>Comment pouvons-nous <br>vous aider <i class="dot">?</i></span>
                            </h1>
                            <hr class="separator">
                        </div>
                    </div>
                    <div class="right-block demand-type col-xxsm-12">
                        <button class="btn bordered" data-type="project" type="button">Développer un projet ?</button>
                        <button class="btn bordered" data-type="training" type="button">Suivre une formation ?</button>
                        <button class="btn bordered" data-type="contact" type="button">Nous contacter ?</button>
                    </div>
                </div>
            </div>
        </header>

        <form id="form-contactUs" class="contact-form natural-language" method="post">
            <div class="block-reveal reveal-form"></div>
            <div class="container">
                <div class="padded-block row">
                    <button id="close-contactUs" class="close-form" type="button">&#x2716;</button>

                    <!--Name (first or last)-->
                    <div class="form-group">
                        <label for="input-name" aria-label="Votre nom">
                            <span class="label-text">Bonjour,<br><br></span>Je m'appelle<span class="required">*</span>
                        </label>
                        <input id="input-name" class="form-field" type="text" name="user-name" aria-requied="true" placeholder="votre nom" required>                      
                    </div>
                    <!--./Name (first or last)-->

                    <!--Project type-->
                    <div id="is-project" class="form-group">
                        <label for="input-project" aria-label="Type de projet">j'ai un projet de<span class="required">*</span></label>
                        <input id="input-project" class="form-field" type="text" name="project-type" aria-required="true" required>
                    </div>
                    <!--./Project type-->

                    <!--Formation-->
                    <div id="is-training" class="form-group">
                        <label for="input-formation" aria-label="Formation">j'aimerai suivre la formation<span class="required">*</span></label>
                        <select id="input-formation" class="form-field" name="formation-type" aria-required="true" required>
                            <option>Initiation HTML et CSS</option>
                            <option>Certification HTML et CSS</option>
                            <option>Wordpress</option>
                            <option>Jquery et Ajax</option>
                            <option>Performances web</option>
                            <option>Accessibilité numérique</option>
                            <option>HTML5</option>
                            <option>Intégration d'emails mobiles</option>
                            <option>CSS3 - Techniques de pros</option>
                            <option>Concepteur - Développeur informatique</option>
                        </select>           
                    </div>
                    <!--./Formation-->

                    <!--Object-->
                    <div id="is-contact" class="form-group">
                        <label for="input-object" aria-label="Objet">je vous contact pour<span class="required">*</span></label>
                        <textarea id="input-object" class="form-field" name="mail-object" aria-required="true" required></textarea>
                    </div>
                    <!--./Object-->

                    <!--Company-->
                    <div id="is-company" class="form-group">
                        <label for="input-company" aria-label="Le nom de votre société">pour la société</label>
                        <input id="input-company" class="form-field" type="text" name="Votre société" placeholder="Votre société">
                    </div>
                    <!--./Company-->

                    <!--Email-->
                    <div class="form-group">
                        <label for="'input-email" aria-label="Email">Vous pouvez me contacter par mail à l'adresse :<span class="required">*</span></label>
                        <input id="input-email" class="form-field" type="email" name="user-email" aria-required="true" placeholder="votre email" required>
                    </div>
                    <!--./Email-->

                    <!--Phone-->
                    <div class="form-group">
                        <label for="input-phone" aria-label="Téléphone">ou par téléphone :</label>
                        <input id="input-phone" class="form-field" type="tel" name="user-phone" placeholder="0102030405" maxlength="10"><span>.</span>
                    </div>
                    <!--./Phone-->

                    <input type="hidden" name="action" value="contact_form">
                    <?php wp_nonce_field('ajax_contact_nonce', 'security'); ?>

                    <div class="form-group">
                        <button id="send-form" class="btn bordered" type="submit">Envoyer</button>
                        <span class="req-mention">*: Champs requis</span>
                    </div>

                    <!--Error field-->
                    <div id="error-alert" class="row">
                        <p class="error-msg">Erreur !</p>
                    </div>
                    <!--./ Error field-->

                </div>  
            </div>
        </form>
        
        <div class="find-us">
            <div class="container">
                <ul class="padded-block row">
                    <li class="col-xxsm-12 col-md-3 col-lg-4">93 rue des chantiers 78000 Versailles</li>
                    <li class="col-xxsm-12 col-md-3">+33 1 39 63 00 78</li> 
                    <li class="col-xxsm-12 col-md-3">contact@liamoneweb.com</li>
                    <li class="col-xxsm-12 col-md-3 col-lg-2">
                        <a href="https://www.facebook.com/LiamoneWeb" title="Suivez-nous sur Facebook">
                            <i class="icon-facebook"></i>
                            <span class="sr-only">Facebook</span>
                        </a>
                        <a href="#" title="Nous rejoindre sur LinkedIn">
                            <i class="icon-linkedin"></i>
                            <span class="sr-only">LinkedIn</span>
                        </a>
                        <a href="#" title="Découvrez notre actualité sur Instagram">
                            <i class="icon-instagram"></i>
                            <span class="sr-only">Instagram</span>
                        </a>
                    </li>
                </ul>
                <div class="padded-block row">
                    <div class="col-xxsm-12 gmap">
                        <iframe src="https://snazzymaps.com/embed/17858" width="100%" height="600px" style="border:none;"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!--./Liamone page container-->

    <?php get_footer(); ?>