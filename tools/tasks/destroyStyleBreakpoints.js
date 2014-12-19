/*jshint node:true, laxbreak:true */
'use strict';

var path = require('path');

module.exports = function(grunt) {
    var srcDir = grunt.config.get('env.DIR_SRC');

    var bpDest = path.resolve(srcDir + '/assets/scss/helpers/_breakpoints.scss');

    grunt.registerTask('destroyStyleBreakpoints', function () {
        grunt.file.delete(bpDest);
    });
};
