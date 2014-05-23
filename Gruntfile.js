module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
				src: [
					'source/js/libs/*.js', // All JS in the libs folder
					'!source/js/libs/modernizr.js', // Except for Modernizr
					'source/js/init.js'
				],
				dest: 'public/js/production.js'
			}
        },
        uglify: {
			build: {
				src: 'public/js/production.js',
				dest: 'public/js/production.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/style.css': 'source/css/style.scss',
					'public/styleguide/css/styleguide.css': 'public/styleguide/css/styleguide.scss',
					'public/styleguide/css/styleguide-specific.css': 'public/styleguide/css/styleguide-specific.scss'
				}
			}
		},
		autoprefixer: {
			single_file: {
				src: 'public/style.css',
				dest: 'public/style.css'
			}
        },
		shell: {
            patternlab: {
                command: "php core/builder.php -gp"
            }
        },
		watch: {
            all: {
                files: ['*'],
                options: { livereload: true }
            },
			html: {
				files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'],
				tasks: ['shell:patternlab'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['source/js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['source/css/*.scss', 'source/css/**/*.scss', 'public/styleguide/css/**/*.scss'],
				tasks: ['sass','autoprefixer'],
				options: {
					livereload: true
				}
			}
		}
    });

	// Plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	// Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch', 'autoprefixer', 'shell:patternlab']);
};
