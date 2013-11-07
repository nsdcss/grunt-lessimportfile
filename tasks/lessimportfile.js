/*
 * grunt-lessimportfile
 * https://github.com/nsdcss/grunt-lessimportfile
 *
 * Copyright (c) 2013 Nikolaj Sokolowski
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function(grunt) {

  var path = require('path');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('lessimportfile', 'Create LESS import files automatically', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      asReference: false,
	  copyExisting: false,
    });

    var importStr = "";

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

		if(options.copyExisting) {
			if (grunt.file.exists(f.dest)) {
				var c = grunt.file.read(f.dest);
				importStr += c;
			}
		}
      
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(sf) {
        importStr += '@import ' + (options.asReference ? '(reference) "' : '"') +  path.relative(path.dirname(f.dest), sf) + '";\n';
      });
      
      // Write the destination file.
      grunt.file.write(f.dest, importStr);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
