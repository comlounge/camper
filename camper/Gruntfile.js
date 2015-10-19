module.exports = function(grunt) {

    require('handlebars');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cjsx: {
            compile: {
                files: 
                    [
                        { src: 'coffee/admin/*.coffee', dest: 'static/js/admin.js' },
                        { src: 'coffee/*.coffee', dest: 'static/js/public.js' }
                    ]
            }
        },
        handlebars: {
            compile: {
                options: {
                    processName: function(filePath) {
                        return filePath.replace(/^static\/templates\//, '').replace(/\.hbs$/, '');
                    }
                },
                files: {'static/templates/templates.js': 'static/templates/*.hbs'},
            }
        },

        watch: {
            css: {
                files: ['less/*.less'],
                tasks: ['less', 'css'],
                options: {
                    spawn: false,
                },
            },
            js: {
                files: ['coffee/**/*.coffee'],
                tasks: ['js'],
                options: {
                    spawn: false,
                },
            },
            hbs: {
                files: ['static/templates/*.hbs'],
                tasks: ['hbs'],
                options: {
                    spawn: false,
                },
            }
        },

        less: {
            development: {
                options: {
                    paths: ['less', 'tmp/bootstrap/less']
                },
                files: {
                    "static/css/bootstrap.css": "less/main.less",
                }
            }
        },

        mkdir: {
            tmp: {
                options: {
                    create: ["tmp"]
                }
            }
        },

        gitclone: {
            bootstrap: {
                options: {
                    repository: "https://github.com/twbs/bootstrap.git",
                    directory: 'tmp/bootstrap',
                    branch: 'v3.3.5'
                }
            }
        },

        bower_concat: {
            public: {
                dest: 'static/js/public_components.js',
                cssDest: 'static/css/public_components.css',
                include: [
                    'bootstrap',
                    "mjolnic-bootstrap-colorpicker",
                    'bootstrap-confirmation2'
                ]
            },
            all: {
                dest: 'static/js/components.js',
                cssDest: 'static/css/components.css',
                exclude: [
                    'angular',
                    'modernizr'
                ],
                include: [
                    'handlebars',
                    'jed',
                    'moment',
                    'moment-timezone',
                    "bootstrap",
                    "jquery-timepicker-jt",
                    "underscore",
                    "marked",
                    "bootstrap-markdown",
                    "tinymce",
                    "parsleyjs",
                    "parsleyjs-bootstrap3",
                    "mjolnic-bootstrap-colorpicker",
                    "bootstrap-datepicker",
                    "datepair",
                    "bootstrap-confirmation2",
                    "typeahead.js",
                    "bootstrap-tagsinput",
                    "shariff",
                    "jquery-slugify"
                ],
                dependencies: {
                },
                bowerOptions: {
                    relative: false
                }
            }
        },

        uglify: {
            options: {
                preserveComments: 'some',
                sourceMap: true
            },
            admin: {
                src: 'static/js/admin.js',
                dest: 'static/js/admin.min.js'
            },
            public: {
                src: ['static/js/public.js'],
                dest: 'static/js/public.min.js'
            },
            public_components: {
                src: ['static/js/jquery-ui.js', 'static/js/public_components.js', 'static/js/fileuploader.js'],
                dest: 'static/js/public_components.min.js'
            }
            /* uglify hangs with this maybe because of https://github.com/gruntjs/grunt-contrib-uglify/issues/233
            components: {
                src: '<%= bower_concat.all.dest %>',
                dest: 'static/js/components.min.js'
            }
            */
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-coffee-react');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    // Default task(s).
    //grunt.registerTask('default', ['cjsx', 'less']);
    grunt.registerTask('default', ['less', 'bower_concat', 'cjsx', 'uglify']);
    grunt.registerTask('hbs', ['handlebars']);
    grunt.registerTask('js', ['cjsx', 'uglify:public', 'uglify:admin']);
    grunt.registerTask('jsall', ['bower_concat', 'js', 'uglify']);
    grunt.registerTask('css', ['less', 'uglify']);
    grunt.registerTask('init', ['mkdir', 'gitclone']);

};

