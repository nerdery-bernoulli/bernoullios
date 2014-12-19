/*jshint node:true, laxbreak:true */
'use strict';

var path = require('path');

module.exports = function(grunt) {
    var shouldMinify = !grunt.option('dev');
    var srcDir = grunt.config.get('env.DIR_SRC');

    var bpPath = path.resolve(srcDir + '/shared/breakpoints.json');
    var bpJSON = require(bpPath);

    grunt.config.merge({
        hbt: {
            buildMarkup: {
                options: {
                    data: {
                        pkg: '<%= pkg %>',
                        env: '<%= env %>',
                        bp: bpJSON
                    },
                    helpers: [
                        '<%= env.DIR_NPM %>/handlebars-layouts/index.js'
                    ],
                    partials: [
                        '<%= env.DIR_SRC %>/templates/**/*.hbs'
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_TMP %>',
                    ext: '.html',
                    src: [
                        '**/*.hbs',
                        '!templates/**',
                        '!assets/vendor/**'
                    ]
                }]
            }
        },

        prettify: {
            buildMarkup: {
                options: {
                    indent: 4,
                    wrap_line_length: 999999, // jshint ignore:line
                    indent_inner_html: false, // jshint ignore:line
                    unformatted: [
                        'a', 'b', 'code', 'i', 'p',
                        'pre', 'small', 'span',
                        'sub', 'sup', 'u', 'textarea'
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_TMP %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['**/*.html']
                }]
            }
        },

        // Replaces script and style tag references with a reference to a
        // single optimized output file.
        usemin: {
            html: ['<%= env.DIR_DEST %>/**/*.html']
        }
    });

    grunt.registerTask('buildMarkup',
        shouldMinify
            ? [
                'hbt:buildMarkup',
                'prettify:buildMarkup',
                'usemin'
            ]
            : [
                'hbt:buildMarkup',
                'prettify:buildMarkup'
            ]
    );
};
