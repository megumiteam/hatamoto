/* vim: set ft=javascript expandtab shiftwidth=2 tabstop=2: */

module.exports = function( grunt ) {

  // Project configuration
  grunt.initConfig( {
    pkg:    grunt.file.readJSON( 'package.json' ),
    jshint: {
      all: [
        'Gruntfile.js',
        'js/{%= safe_file_name %}.js',
        {% if ('y' === need_admin) { %}'js/admin-{%= safe_file_name %}.js',{% } %}
        'js/test/**/*.js'
      ],
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true,
                browser: true,
                devel:   true,
                jquery:  true,
        globals: {
          exports: true,
          module:  false
        }
      }
    },
    uglify: {
      all: {
        files: {
          {% if ('y' === need_admin) { %}
          'js/admin-{%= safe_file_name %}.min.js': [
            'js/admin-{%= safe_file_name %}.js'
          ],
          {% } %}
          'js/{%= safe_file_name %}.min.js': [
            'js/{%= safe_file_name %}.js'
          ]
        },
        options: {
          banner: '/**\n' +
            ' * <%= pkg.title %> - v<%= pkg.version %>\n' +
            ' *\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * <%= pkg.repository.url %>\n' +
            ' *\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
            ' * Released under the <%= pkg.license %>\n' +
            ' */\n',
          mangle: {
            except: ['jQuery']
          }
        }
      }
    },
    test:   {
      files: ['js/test/**/*.js']
    },
    {% if ('sass' === css_type) { %}
    sass:   {
      all: {
        options: {
          style: 'expanded',
          sourcemap: 'auto'
        },
        files: {
          {% if ('y' === need_admin) { %}'css/admin-{%= safe_file_name %}.css': 'css/admin-{%= safe_file_name %}.scss',{% } %}
          'css/{%= safe_file_name %}.css': 'css/{%= safe_file_name %}.scss'
        }
      }
    },
    {% } else if ('less' === css_type) { %}
    less:   {
      all: {
        files: {
          {% if ('y' === need_admin) { %}'css/admin-{%= safe_file_name %}.css': 'css/admin-{%= safe_file_name %}.less',{% } %}
          'css/{%= safe_file_name %}.css': 'css/{%= safe_file_name %}.less'
        }
      }
    },
    {% } %}
    cssmin: {
      options: {
        banner: '/**\n' +
            ' * <%= pkg.title %> - v<%= pkg.version %>\n' +
            ' *\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * <%= pkg.repository.url %>\n' +
            ' *\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
            ' * Released under the <%= pkg.license %>\n' +
            ' */\n'
      },
      minify: {
        expand: true,
        cwd: 'css/',
        src: [
          {% if ('y' === need_admin) { %}'admin-{%= safe_file_name %}.css',{% } %}
          '{%= safe_file_name %}.css'
        ],
        dest: 'css/',
        ext: '.min.css'
      }
    },
    watch:  {
      {% if ('sass' === css_type) { %}
      sass: {
        files: ['css/*.scss'],
        tasks: ['sass', 'cssmin'],
        options: {
          debounceDelay: 500
        }
      },
      {% } else if ('less' === css_type) { %}
      less: {
        files: ['css/*.less'],
        tasks: ['less', 'cssmin'],
        options: {
          debounceDelay: 500
        }
      },
      {% } else { %}
      styles: {
        files: ['css/*.css', '!css/*.min.css'],
        tasks: ['cssmin'],
        options: {
          debounceDelay: 500
        }
      },
      {% } %}
      scripts: {
        files: ['js/*.js', '!js/*.min.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          debounceDelay: 500
        }
      }
    }
  } );

  // Load other tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  {% if ('sass' === css_type) { %}
  grunt.loadNpmTasks('grunt-contrib-sass');
  {% } else if ('less' === css_type) { %}
  grunt.loadNpmTasks('grunt-contrib-less');
  {% } %}
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  {% if ('sass' === css_type) { %}
  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin']);
  {% } else if ('less' === css_type) { %}
  grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']);
  {% } else { %}
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
  {% } %}

  grunt.util.linefeed = '\n';
};
