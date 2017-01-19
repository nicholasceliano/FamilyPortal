module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-uglify');//for minifying and combining files
grunt.loadNpmTasks('grunt-contrib-concat');//for combining files

  // Project configuration.
  grunt.initConfig({
    concat: {
		my_target: {
			files: {
				'dist/familyPortal.js': ['app/familyPortalApp.js', 'app/**/*.js', 'app/*/*.js']
			}
      }
	}
  });

  // Default task(s).
  grunt.registerTask('concatFamilyPortalJS', ['concat']);
};