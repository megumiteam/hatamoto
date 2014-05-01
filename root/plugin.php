<?php
/**
 * Plugin Name: {%= title %}
 * Plugin URI:  {%= homepage %}
 * Description: {%= description %}
 * Version:     0.1.0
 * Author:      {%= author_name %}
 * Author URI:  {%= author_url %}
 * License:     {%= license %}
 * Text Domain: {%= prefix %}
 * Domain Path: /languages
 */

/**
 * Copyright (c) {%= grunt.template.today( 'yyyy' ) %} {%= author_name %} ( {%= author_url %} )
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

{% if ( 'y' === use_composer ) { %}
require( dirname( __FILE__ ).'/vendor/autoload.php' );
{% } %}

define( '{%= prefix_caps %}_URL',  plugins_url( '', __FILE__ ) );
define( '{%= prefix_caps %}_PATH', dirname( __FILE__ ) );

${%= prefix %} = new {%= prefix_capitalize %}();
${%= prefix %}->register();

class {%= prefix_capitalize %} {

private $version = '';
private $langs   = '';

function __construct()
{
    $data = get_file_data(
        __FILE__,
        array( 'ver' => 'Version', 'langs' => 'Domain Path' )
    );
    $this->version = $data['ver'];
    $this->langs   = $data['langs'];
}

public function register()
{
    add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
}

public function plugins_loaded()
{
    load_plugin_textdomain(
        '{%= prefix %}',
        false,
        dirname( plugin_basename( __FILE__ ) ).$this->langs
    );

    add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ) );
{% if ( 'y' === need_admin ) { %}
    add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
    add_action( 'admin_menu', array( $this, 'admin_menu' ) );
    add_action( 'admin_init', array( $this, 'admin_init' ) );
{% } %}
}
{% if ( 'y' === need_admin ) { %}
public function admin_menu()
{
    // See http://codex.wordpress.org/Administration_Menus
    add_options_page(
        __( '{%= title %}', '{%= prefix %}' ),
        __( '{%= title %}', '{%= prefix %}' ),
        'manage_options', // http://codex.wordpress.org/Roles_and_Capabilities
        '{%= prefix %}',
        array( $this, 'options_page' )
    );
}

public function admin_init()
{
    if ( isset( $_POST['_wpnonce_{%= prefix %}'] ) && $_POST['_wpnonce_{%= prefix %}'] ){
        if ( check_admin_referer( '{%= hash %}', '_wpnonce_{%= prefix %}' ) ){

            // save something

            wp_safe_redirect( menu_page_url( '{%= prefix %}', false ) );
        }
    }
}

public function options_page()
{
?>
<div id="{%= prefix %}" class="wrap">
<h2><?php _e( '{%= title %}', '{%= prefix %}' ); ?></h2>

<form method="post" action="<?php echo esc_attr( $_SERVER['REQUEST_URI'] ); ?>">
<?php wp_nonce_field( '{%= hash %}', '_wpnonce_{%= prefix %}' ); ?>

Admin Panel Here!

<p style="margin-top: 3em;">
    <input type="submit" name="submit" id="submit" class="button button-primary"
            value="<?php _e( "Save Changes", "{%= prefix %}" ); ?>"></p>
</form>
</div><!-- #{%= prefix %} -->
<?php
}

public function admin_enqueue_scripts($hook)
{
    if ( 'settings_page_{%= prefix %}' === $hook ) {
        wp_enqueue_style(
            'admin-{%= prefix %}-style',
            plugins_url( 'css/admin-{%= safe_file_name %}.min.css', __FILE__ ),
            array(),
            $this->version,
            'all'
        );

        wp_enqueue_script(
            'admin-{%= prefix %}-script',
            plugins_url( 'js/admin-{%= safe_file_name %}.min.js', __FILE__ ),
            array( 'jquery' ),
            $this->version,
            true
        );
    }
}
{% } %}
public function wp_enqueue_scripts()
{
    wp_enqueue_style(
        '{%= safe_file_name %}-style',
        plugins_url( 'css/{%= safe_file_name %}.min.css', __FILE__ ),
        array(),
        $this->version,
        'all'
    );

    wp_enqueue_script(
        '{%= safe_file_name %}-script',
        plugins_url( 'js/{%= safe_file_name %}.min.js', __FILE__ ),
        array( 'jquery' ),
        $this->version,
        true
    );
}

} // end class {%= prefix_capitalize %}

// EOF
