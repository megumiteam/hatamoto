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
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %} ({%= author_url %})
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

{% if ('y' === use_composer) { %}
require(dirname(__FILE__).'/vendor/autoload.php');
{% } %}

define('{%= prefix_caps %}_URL',  plugins_url('', __FILE__));
define('{%= prefix_caps %}_PATH', dirname(__FILE__));

${%= prefix %} = new {%= prefix_capitalize %}();
${%= prefix %}->init();

class {%= prefix_capitalize %} {

private $version = '';
private $langs   = '';

function __construct()
{
    $data = get_file_data(
        __FILE__,
        array('ver' => 'Version', 'langs' => 'Domain Path')
    );
    $this->version = $data['ver'];
    $this->langs   = $data['langs'];
}

public function init()
{
    add_action('plugins_loaded', array($this, 'plugins_loaded'));
    add_action('wp_enqueue_scripts', array($this, 'wp_enqueue_scripts'));
}

public function plugins_loaded()
{
    load_plugin_textdomain(
        '{%= prefix %}',
        false,
        dirname(plugin_basename(__FILE__)).$this->langs
    );
}

Public function wp_enqueue_scripts()
{
    wp_enqueue_style(
        '{%= safe_file_name %}-style',
        plugins_url('css/{%= safe_file_name %}.min.css', __FILE__),
        array(),
        $this->version,
        'all'
    );

    wp_enqueue_script(
        '{%= safe_file_name %}-script',
        plugins_url('js/{%= safe_file_name %}.min.js', __FILE__),
        array('jquery'),
        $this->version,
        true
    );
}

} // end TestPlugin

// EOF
