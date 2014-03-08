module.exports = function (grunt) {
	grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: ';',
			},
			es6slider : {
				src: ['src/lib/traceur-runtime.js','tmp/es6slider-pre-compiled.js','tmp/main.js'],
				dest: 'presentations/sample/bin/es6slider.js',
			}
		},

        uglify: {
            options: {
				mangle: false
            },

            es6slider : {
                files: {
                	'presentations/sample/bin/es6slider-min.js': ['presentations/sample/bin/es6slider.js']
                }
            }
        },

        traceur: {
			options: {
				/* Turn on some of the experimental features */
				blockBinding : true,
				symbols : true,
				deferredFunctions : true,
				types : true,
				annotations : true,
				modules : true
			},

			es6slider : {
				files:{
					'tmp/es6slider-pre-compiled.js': ['src/es6slider.js'],
					'tmp/main.js' : ['presentations/sample/*.js']
				}
			}
		}
    });

	/* Load tasks */
    grunt.loadNpmTasks('grunt-traceur');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /* Tasks */
    grunt.registerTask('default', ['traceur','concat','uglify']);
}