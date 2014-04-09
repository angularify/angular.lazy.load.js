'use strict';

var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    dirs: {
        src: 'src',
        dest: 'dist'
    },
    concat: {
      options: {},
      dist: {
        src: ['<%= dirs.src %>/*.js', '<%= dirs.src %>/**/*.js'],
        dest: '<%= dirs.dest %>/angular-lazy-load.min.js'
      }
    }
  });

  grunt.registerTask('build', ['concat']);
}