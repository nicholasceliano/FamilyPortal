module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-uglify');//for minifying and combining files
	grunt.loadNpmTasks('grunt-contrib-concat');//for combining files

	//Configure Grunt Tasks
	grunt.initConfig({
		concat: {
			angularJS_Dev: {
				src: [
						'content/app/familyPortalApp.js'
						, 'content/app/**/*.js'
						, 'content/app/*/*.js'
					],
				dest: 'dist/familyPortal.js'
			}
			, familyPortalCSS_Dev: {
				src: [
						'content/css/*.css'
					],
				dest: 'dist/familyPortal.css'
			}
			, thirdPartyJS_Dev : {
				src: [
						'content/thirdParty/js/bootstrap.js'
					],
				dest: 'dist/thirdPartyJS.js'
			}
			, thirdPartyCSS_Dev: {
				src: [
						'content/thirdParty/css/bootstrap.css'
						, 'content/thirdParty/css/bootstrap-theme.css'
						, 'content/thirdParty/css/font-awesome.css'
					],
				dest: 'dist/thirdPartyCSS.css'
			}
		}
  });

	//Grunt Tasks.
	grunt.registerTask('concatDevFiles', ['concat:angularJS_Dev'
										,'concat:familyPortalCSS_Dev'
										,'concat:thirdPartyJS_Dev'
										,'concat:thirdPartyCSS_Dev']);
};