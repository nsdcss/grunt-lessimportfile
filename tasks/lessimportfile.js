/*
 * grunt-lessimportfile
 * https://github.com/nsdcss/grunt-lessimportfile
 *
 * Copyright (c) 2013 Nikolaj Sokolowski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var p = require('path');

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('lessimportfile', 'Create LESS import files automatically', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			asReference: false,
			copyExisting: false,
			asReferenceIdentifier: '__',
			optionalComponentIdentifier: 'oc__',
			includeAllComponents: true,
			optionalComponentsList: []
		});

		var importStr = "";
		var optionalComponentIdentifierMatch = new RegExp('^' + options.optionalComponentIdentifier,"g");
		var asReferenceIdentifierMatch = new RegExp('^' + options.asReferenceIdentifier,"g");

		var checkIfNeededComponent = function(filepath) {
			var fileName = p.basename(filepath);
			if(fileName.match(optionalComponentIdentifierMatch)) {
				if(options.optionalComponentsList.indexOf(fileName) >= 0) {
					grunt.log.writeln('Component "' + fileName + '" will be included');
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		};

		var checkIfAsReference = function(filepath) {
			var fileName = p.basename(filepath);
			if(fileName.match(asReferenceIdentifierMatch)) {
				return true;
			} else {
				return false;
			}
		};

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {

			if(options.copyExisting) {
				if(grunt.file.exists(f.dest)) {
					var c = grunt.file.read(f.dest);
					importStr += c;
				}
			}

			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if(!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					if(options.includeAllComponents) {
						return true;
					} else {
						return checkIfNeededComponent(filepath);
					}
				}
			}).forEach(function(sf) {
					importStr += '@import ' + ((options.asReference || checkIfAsReference(sf)) ? '(reference) "' : '"') + p.relative(p.dirname(f.dest), sf) + '";\n';
				});

			// Write the destination file.
			grunt.file.write(f.dest, importStr);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
