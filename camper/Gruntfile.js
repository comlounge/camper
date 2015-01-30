module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: {
                    'static/js/sessions.js': 'coffee/sesions.coffee'
                }
            }
        },

        watch: {
            scripts: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            },
        },

        less: {
            development: {
                options: {
                    paths: ['tmp/bootstrap/less']
                },
                files: {
                    "static/css/bootstrap.css": "less/main.less"
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
                    directory: 'tmp/bootstrap'
                }
            }
        },

        bower_concat: {
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
                    "jquery-timepicker-jt",
                    "jquery-ui",
                    "angular-ui-sortable",
                    "angular-i18n",
                    "underscore",
                    "angular-promise-tracker",
                    "marked",
                    "bootstrap-markdown",
                    //"fuelux",
                    "bootstrap-datepicker",
                    "datepair",
                    "bootstrap-confirmation2",
                    "shariff"
                ],
                dependencies: {
                },
                bowerOptions: {
                    relative: false
                }
            }
        },

        concat: {
            options: {
                stripBanners: false
            },
            bootstrap: {
                src: [
                    'tmp/bootstrap/js/transition.js',
                    'tmp/bootstrap/js/alert.js',
                    'tmp/bootstrap/js/button.js',
                    'tmp/bootstrap/js/carousel.js',
                    'tmp/bootstrap/js/collapse.js',
                    'tmp/bootstrap/js/dropdown.js',
                    'tmp/bootstrap/js/modal.js',
                    'tmp/bootstrap/js/tooltip.js',
                    'tmp/bootstrap/js/popover.js',
                    'tmp/bootstrap/js/scrollspy.js',
                    'tmp/bootstrap/js/tab.js',
                    'tmp/bootstrap/js/affix.js'
                ],
                dest: 'static/js/bt.js'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some',
                sourceMap: true
            },
            core: {
                src: '<%= concat.bootstrap.dest %>',
                dest: 'static/js/bt.min.js'
            },
            components: {
                src: '<%= bower_concat.all.dest %>',
                dest: 'static/js/components.min.js'
            }
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
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('init', ['mkdir', 'gitclone']);

};

