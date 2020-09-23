<?php

function andi_files() {
  wp_enqueue_style('custom_google_fonts', 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600');
  wp_enqueue_script('font_awesome', 'https://kit.fontawesome.com/b42e86d591.js');
  wp_enqueue_style('andi_main_styles', get_stylesheet_uri());  
//  wp_enqueue_script('nanogallery', 'https://cdnjs.cloudflare.com/ajax/libs/nanogallery2/3.0.2/jquery.nanogallery2.min.js', array('jquery'), false, true );
  wp_enqueue_script('andi_data', get_template_directory_uri().'/js/data.js', array(), false, true );
  wp_enqueue_script('andi_js', get_template_directory_uri().'/js/andi.js', array('jquery'), false, true );
}

add_action('wp_enqueue_scripts', 'andi_files'); 

