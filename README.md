# grunt-lessimportfile

This Plugin lets your create a LESS import file automatically by running threw specified folders. This is useful if you are at the beginning of the development-process and want easily change the structure or names of your files and folders without having to care for the update statements in your "master" less file.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lessimportfile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lessimportfile');
```

## The "importfile" task

### Overview
In your project's Gruntfile, add a section named `importfile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  lessimportfile: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.asReference
Type: `Boolean`
Default value: `false`

Import the specified files as a reference. It will create an import-statement like this: `@import (reference) "file.less"`

#### options.copyExisting
Type: `Boolean`
Default value: `false`

Keep the content of the specified target file.

#### options.optionalComponentIdentifier
Type: `String`
Default value: `"oc__"`

#### options.includeAllComponents
Type: `Boolean`
Default value: `true`

#### options.optionalComponentsList
Type: `Array`
Default value: `[]`

### Usage Examples

#### Default Options
In this example, the default options are used.

```js
grunt.initConfig({
  lessimportfile: {
    options: {},
    files: {
      'your-framework/master.less': ['your-framework/modules/**/*.less', 'your-framework/variables.less']
    },
  },
})
```

#### Custom Options
In this example, custom options are used.

```js
grunt.initConfig({
  lessimportfile: {
    setup: {
	  options: {},
	  files: {
		'your-framework/master.less': ['your-framework/base/**/*.less']
	  },
	},
	framework: {
	  options: {
		asReference: true,
		copyExisting: true
	  },
	  files: {
		'your-framework/master.less': ['your-framework/abstract-modules/**/*.less'],
	  },
	},
	ui: {
	  options: {
		copyExisting: true
	  },
	  files: {
		'your-framework/master.less': ['your-framework/ui/**/*.less', 'your-framework/variables.less']
	  },
	},
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.1.0

+ Initial Release
