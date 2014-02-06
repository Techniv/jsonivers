/**
 * Created by Vincent Peybernes on 05/02/14.
 */
module.exports = function (grunt) {

	grunt.initConfig({
		nodeunit: {
			all: ['test/**/*-test.js']
		}
	});

	grunt.registerTask('default', ['nodeunit']);
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
};