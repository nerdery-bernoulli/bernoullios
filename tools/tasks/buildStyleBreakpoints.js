/*jshint node:true, laxbreak:true */
'use strict';

var path = require('path');

module.exports = function(grunt) {
    var srcDir = grunt.config.get('env.DIR_SRC');

    var bpDest = path.resolve(srcDir + '/assets/scss/helpers/_breakpoints.scss');
    var bpPath = path.resolve(srcDir + '/shared/breakpoints.json');
    var bpJSON = require(bpPath);

    var bpContent = '';

    for (var key in bpJSON) {
        var attrName = key;
        var attrValue = bpJSON[key];
        bpContent = bpContent + ' $' + attrName + ': ' + attrValue + ';'
    }

    grunt.registerTask('buildStyleBreakpoints', function () {
        grunt.file.write(bpDest, bpContent);
    });
};
