module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: 
                    [
                        { src: 'coffee/admin/*.coffee', dest: 'static/js/admin.js' },
                        { src: 'coffee/*.coffee', dest: 'static/js/public.js' }
                    ]
            }
        },

        watch: {
            scripts: {
                files: ['less/*.less', 'static/js/*.js'],
                tasks: ['less', 'css'],
                options: {
                    spawn: false,
                },
            },
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
                    'jquery',
                    'jquery-ui',
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
                    "angular-mocks",
                    "angular-route",
                    "angular-jquery-timepicker",
                    "ng-tags-input",
                    "jquery-timepicker-jt",
                    "angular-ui-sortable",
                    "angular-ui-autocomplete",
                    "angular-i18n",
                    "underscore",
                    "angular-promise-tracker",
                    "marked",
                    "bootstrap-markdown",
                    "tinymce",
                    "parsleyjs",
                    "parsleyjs-bootstrap3",
                    "mjolnic-bootstrap-colorpicker",
                    //"fuelux",
                    "bootstrap-datepicker",
                    "datepair",
                    "bootstrap-confirmation2",
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
                src: 'static/js/public.js',
                dest: 'static/js/public.min.js'
            },
            public_components: {
                src: ['static/js/public_components.js'],
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

    // Default task(s).
    //grunt.registerTask('default', ['coffee', 'less']);
    grunt.registerTask('default', ['less', 'bower_concat', 'coffee', 'uglify']);
    grunt.registerTask('js', ['coffee', 'uglify:public', 'uglify:admin', 'uglify:public_components']);
    grunt.registerTask('jsall', ['bower_concat', 'js', 'uglify']);
    grunt.registerTask('css', ['less', 'uglify']);
    grunt.registerTask('init', ['mkdir', 'gitclone']);

};

