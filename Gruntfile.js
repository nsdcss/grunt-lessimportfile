/*
 * grunt-importfile
 * https://github.com/nsdcss/importfile-creator
 *
 * Copyright (c) 2013 Nikolaj Sokolowski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},

		// Configuration to be run (and then tested).
		lessimportfile: {
			default_options: {
				files: {
					'tmp/styles.collector.default_options.less': ['test/**/*.less', 'test/fixtures/variables.less']
				},
			},
			custom_options_setup: {
				options: {
					asReferenceIdentifier: '_r_'
				},
				files: {
					'tmp/styles.collector.custom_options.less': ['test/fixtures/import/base/**/*.less']
				},
			},
			custom_options_framework: {
				options: {
					asReference: true,
					copyExisting: true
				},
				files: {
					'tmp/styles.collector.custom_options.less': ['test/fixtures/import/reference/**/*.less'],
				},
			},
			custom_options_components: {
				options: {
					copyExisting: true,
					includeAllComponents: false,
					optionalComponentIdentifier: 'oc__',
					optionalComponentsList: ['oc__optional-component.less']
				},
				files: {
					'tmp/styles.collector.custom_options.less': ['test/fixtures/import/components/**/*.less']
				},
			},
			custom_options_ui: {
				options: {
					copyExisting: true
				},
				files: {
					'tmp/styles.collector.custom_options.less': ['test/fixtures/import/ui/**/*.less', 'test/fixtures/variables.less']
				},
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'lessimportfile', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
