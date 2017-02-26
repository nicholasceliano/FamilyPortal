module.exports = function(grunt) {
	grunt.file.setBase('../');
  
	grunt.loadNpmTasks('grunt-contrib-uglify');//for minifying and combining js files
	grunt.loadNpmTasks('grunt-contrib-cssmin');//for minifying and css files
	grunt.loadNpmTasks('grunt-contrib-concat');//for combining files
	grunt.loadNpmTasks('grunt-contrib-copy');//for copying files
	grunt.loadNpmTasks('grunt-contrib-jshint');//for cleaning up code
	
	//Configure Grunt Tasks
	grunt.initConfig({
		concat: {
			angularJS_Dev: {
				src: [
						'content/app/familyPortalApp.js', 
						'content/app/**/*.js',
						'content/app/*/*.js'
					],
				dest: 'dist/familyPortal.js'
			},
			familyPortalCSS_Dev: {
				src: [
						'content/css/*.css'
					],
				dest: 'dist/familyPortal.css'
			},
			thirdPartyJS_Dev : {
				src: [
						'content/thirdParty/js/angular-pnotify.js',
						'content/thirdParty/js/bootstrap.js'
					],
				dest: 'dist/thirdPartyJS.js'
			},
			thirdPartyCSS_Dev: {
				src: [
						'content/thirdParty/css/bootstrap.css',
						'content/thirdParty/css/bootstrap-theme.css',
						'content/thirdParty/css/font-awesome.css'
					],
				dest: 'dist/thirdPartyCSS.css'
			}
		},
		copy: {
			angularJS_Templates: {
			expand: true,
			flatten: true,
			src:  [
						'content/app/**/*.html',
						'content/app/*/*.html'
					],
			dest: 'dist/templates/'
		  },
		  images: {
			expand: true,
			flatten: true,
			src : [
				'content/images/*.png',
				'content/images/*.ico',
				'content/images/*.gif',
				'content/images/*.jpg'
			],
			dest: 'dist/images/'
		  }
		},
		uglify: {
			angularJS_Prod: {
				mangle: true,
				src: [
						'content/app/familyPortalApp.js',
						'content/app/**/*.js',
						'content/app/*/*.js'
					],
				dest: 'dist/familyPortal.js'
			},
			thirdPartyJS_Prod : {
				mangle: true,
				src: [
						'content/thirdParty/js/angular-pnotify.js',
						'content/thirdParty/js/bootstrap.js'
					],
				dest: 'dist/thirdPartyJS.js'
			}
		},
		cssmin: {
			familyPortalCSS_Prod: {
				src: [
						'content/css/*.css'
					],
				dest: 'dist/familyPortal.css'
			},
			thirdPartyCSS_Prod: {
				src: [
						'content/thirdParty/css/bootstrap.css',
						'content/thirdParty/css/bootstrap-theme.css',
						'content/thirdParty/css/font-awesome.css'
					],
				dest: 'dist/thirdPartyCSS.css'
			}
		},
		jshint: {
			files: [
				'content/app/**/*.js', 
				'routes/**/*.js', 
				'tests/**/*.js',
				'util/**/*.js',
				'*.js'
			],
			options: {
				globals: {
					jQuery: true
				}
			}
		}
  });

	//Grunt Tasks.
	grunt.registerTask('concatDevFiles', ['concat:angularJS_Dev',
										'concat:familyPortalCSS_Dev',
										'concat:thirdPartyJS_Dev',
										'concat:thirdPartyCSS_Dev']);
										
	grunt.registerTask('minifyProdFiles', ['uglify:angularJS_Prod',
										'cssmin:familyPortalCSS_Prod',
										'uglify:thirdPartyJS_Prod',
										'cssmin:thirdPartyCSS_Prod']);
										
	grunt.registerTask('copyFiles', ['copy:angularJS_Templates',
									'copy:images']);
											
	grunt.registerTask('runJsHint', ['jshint']);
};