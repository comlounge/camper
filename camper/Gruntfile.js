module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
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



    // Default task(s).
    //grunt.registerTask('default', ['coffee', 'less']);
    grunt.registerTask('default', ['less']);
    grunt.registerTask('init', ['mkdir', 'gitclone']);

};

