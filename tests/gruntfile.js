module.exports = function(grunt) {

    var continuousIntegrationMode = grunt.option('ci') || false;

	grunt.initConfig({
	  casperjs: {
	    options: {
	      async: {
	        parallel: false,
	        viewportSize:{width: 1024, height: 800}
	      }
	    },
	    files: ['tests/casperjs/**/*.js']
	  },
	});

    grunt.loadNpmTasks('grunt-casperjs');

    grunt.registerTask('default', ['casperjs']);
};

