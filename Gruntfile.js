var banner = '/* \n' +
            '--------------------------------------\n' +
            'Vimeo Portfolio Page                  \n' +
            '--------------------------------------\n' +
            '+ https://github.com/pinceladasdaweb/Vimeo-Portfolio-Page \n' +
            '+ version 0.0.1 \n' +
            '+ Copyright 2014 Pedro Rogerio \n' +
            '+ Licensed under the MIT license \n' +
            '\n' +
            '+ Documentation: https://github.com/pinceladasdaweb/Vimeo-Portfolio-Page \n' +
            '*/'

module.exports = function (grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        cssmin: {
            with_banner: {
                options: {
                    banner: banner
                },
                files: {
                    'assets/css/style.min.css': ['assets/css/style.css']
                }
            }
        },
        uglify: {
            options: {
                banner: banner
            },
            my_target: {
                files: {
                'assets/js/app.min.js': ['assets/js/app.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'cssmin', 'uglify' ]);
};
