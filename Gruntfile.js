/**
 * Created by Vincent Peybernes on 05/02/14.
 */
var fs = require('fs');

var config = {
	docPath: 'doc'
}

module.exports = function (grunt) {

	grunt.initConfig({
		nodeunit: {
			all: ['test/**/*-test.js']
		},
		jsdoc:{
			dist:{
				src: ['libs/*.js', 'ReadMe.md'],
				options:{
					destination: config.docPath
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('default', ['nodeunit']);
	grunt.registerTask('build', ['doc', 'nodeunit']);

	grunt.registerTask('doc', 'Create doc.', function(){
		grunt.file.delete(config.docPath, {force:true});
		grunt.task.run('jsdoc');
	})
};