/* vim: set ft=javascript expandtab shiftwidth=2 tabstop=2: */

/**
 * Hatammoto
 * https://github.com/miya0001/wp-plugin
 *
 * Copyright (c) 2013 Takayuki Miyauchi (http://firegoby.jp/)
 * Licensed under the MIT License
 */

'use strict';

exports.description = 'Create a WordPress plugin.';

exports.notes = '';
exports.after = '';
exports.warnOn = '*';

var path = require('path');
var path_name = path.basename(process.cwd());

exports.template = function( grunt, init, done ) {
  init.process( {}, [
    // Prompt for these values.
    {
      name   : 'title',
      message: 'Name of the plugin.',
      default: function(value, data, done) {
        var name = path_name.replace(/[\W]+/g, ' ').ucFirstAllWords();
        done(null, name || '');
      }
    },
    {
      name   : 'prefix',
      message: 'PHP function prefix (alpha and underscore characters only)',
      default: function(value, data, done) {
        var prefix = path_name.replace(/[\W]+/g, '_').toLowerCase();
        done(null, prefix || '');
      }
    },
    {
      name   : 'wp_version',
      message: 'Version of the WordPress that your plugin requires.',
      // get the latest version number from api at wordpress.org
      default: function(value, data, done) {
        try {
          var http = require('http');
          var api = 'http://api.wordpress.org/core/version-check/1.7/';
          http.get(api, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
              try {
                var ver = JSON.parse(body).offers[0].current.replace(/\.\d+$/, '');
                done(null, ver);
              } catch (e) {
                done(null, '');
              }
            });
          }).on('error', function(e){
            done(null, '');
          });
        } catch (e) {
          done(null, '');
        }
      }
    },
    {
      name   : 'description',
      message: 'A brief description of the Plugin.',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'contributor',
      message: "Contributor should be a list of wordpress.org userid's.",
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'homepage',
      message: 'URI of page describing plugin and updates.',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'author_name',
      message: 'Your name.',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'author_url',
      message: 'URI of the plugin author.',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'repository_type',
      message: 'Type of source code repository.',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'repository_url',
      message: 'URI of source code repository.',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'license',
      message: 'License',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name   : 'license_uri',
      message: 'License URI',
      default: function(value, data, done) {
        done(null, init.defaults[this.name] || '');
      }
    },
    {
      name: 'css_type',
      message: 'Will you use "Sass", "LESS", or "none" for CSS with this project?',
      default: 'Sass'
    },
    {
      name: 'use_composer',
      message: 'Will you use Composer with this project? "yes" or "no".',
      validator: /^(y|n|yes|no|)$/,
      default: 'no'
    }
  ], function( err, props ) {
    //console.log(props);
    props.keywords = [];
    props.version = '0.1.0';
    props.devDependencies = {
      'grunt': '~0.4.1',
      'grunt-contrib-uglify':   '~0.1.1',
      'grunt-contrib-cssmin':   '~0.6.0',
      'grunt-contrib-jshint':   '~0.1.1',
      'grunt-contrib-watch':    '~0.2.0'
    };
    // Sanitize names where we need to for PHP/JS
    props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();
    // Development prefix (i.e. to prefix PHP function names, variables)
    props.prefix = props.prefix.replace(/[\W]+/g, '_').toLowerCase();
    // Development prefix in all caps (e.g. for constants)
    props.prefix_caps = props.prefix.toUpperCase();
    props.prefix_capitalize = props.title.ucFirstAllWords().replace(/[\W]+/g, '_');
    // An additional value, safe to use as a JavaScript identifier.
    props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
    props.safe_file_name = props.name.replace(/[\W_]+/g, '-');

    // An additional value that won't conflict with NodeUnit unit tests.
    props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;
    props.js_safe_name_caps = props.js_safe_name.toUpperCase();

    props.use_composer = props.use_composer.charAt(0).toLowerCase();

    // Files to copy and process

    var files = init.filesToCopy( props );

    if (props.use_composer == 'n') {
      delete files['composer.json'];
    }

    switch( props.css_type.toLowerCase()[0] ) {
      case 'l':
        delete files[ 'css/' + props.safe_file_name + '.scss'];
        delete files[ 'css/' + props.safe_file_name + '.css' ];
        props.devDependencies["grunt-contrib-less"] = "~0.5.0";
        props.css_type = 'less';
        break;
      case 'n':
      case undefined:
        delete files[ 'css/' + props.safe_file_name + '.less'];
        delete files[ 'css/' + props.safe_file_name + '.scss'];
        props.css_type = 'none';
        break;
      // SASS is the default
      default:
        delete files[ 'css/' + props.safe_file_name + '.less'];
        delete files[ 'css/' + props.safe_file_name + '.css' ];
        props.devDependencies["grunt-contrib-sass"] = "~0.2.2";
        props.css_type = 'sass';
        break;
    }
    //console.log( files );
    // Actually copy and process files
    init.copyAndProcess( files, props );
    // Generate package.json file
    init.writePackageJSON('package.json', props, function(props, params){
      props.license = params.license;
      props.repository = {
        type: params.repository_type,
        url:  params.repository_url
      };
      return props;
    });
    // Done!
    done();
  });
};

String.prototype.ucFirstAllWords = function()
{
    var pieces = this.split(" ");
    for ( var i = 0; i < pieces.length; i++ )
    {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}

