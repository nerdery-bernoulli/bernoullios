/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        autoprefixer: {
            options: {
                browsers: ['last 5 versions', 'ie 8', 'ie 9']
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_DEST %>/assets/styles',
                    src: ['*.css', '!hero-base.css'],
                    dest: '<%= env.DIR_DEST %>/assets/styles',
                    ext: '.css'
                }],
            }
        }
    });

    grunt.registerTask('vendorPrefix', [
        'autoprefixer'
    ]);
};
