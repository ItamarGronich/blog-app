Grunt
=====

****

What is Grunt?
------------------

> [Grunt][] - The JavaScript Task Runner

****

Why do we need it?
-------------------------

> Automate repetitive tasks

- Minification
- Compilation
- Unit Testing
- Linting
- etc.

****

Prerequisites
-----------------

- Node.js
- `npm`
- `package.json`
	- `npm init`
	- Store project dev dependencies (Grunt plugins)
- Local `grunt` package
- Global `grunt-cli` package

****

### `package.json` Example

```js
{
	"name": "my-project-name",
	"version": "0.1.0",
	"devDependencies": {
		"grunt": "~0.4.5",
		"grunt-contrib-jshint": "~0.10.0",
		"grunt-contrib-nodeunit": "~0.4.1",
		"grunt-contrib-uglify": "~0.5.0"
	}
}
```

- `npm install` vs. `npm install grunt --save-dev`

****

Grunt CLI
------------

- Install a global `grunt-cli` package

```js
npm install -g grunt-cli
```

- This is not the task runner, it just allows running a version of Grunt next to a `Gruntfile.js`

****

### Grunt help

```js
grunt -h
```

****

`Gruntfile.js`
----------------------

> A JS file that defines which plugins to load and tasks to run

****

### Example

- [Gruntfile.js][]

****

### The "wrapper" function

- Basic Node module

```js
module.exports = function (grunt) {
	// Do grunt-related things in here
};
```

****

### Project and task configuration

```js
// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		target: {
			src: 'src/js/<%= pkg.name %>.js',
			dest: 'dist/js/<%= pkg.name %>.min.js'
		}
	}
});
```

- Plugin settings will usually be set under a property of the same name (e.g. `uglify`)
- Everything else is just ignored by the plugins
- We can use template strings (`<%= %>`) inside string values

****

### Loading Grunt plugins and tasks

- Most commonly used tasks are already available as Grunt plugins
- If it's set as a dependency in `package.json` and installed with `npm install`, we can use it in `Gruntfile.js`

```js
// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
```

- We can check which tasks are available using `grunt -h`

****

### Setting default tasks

- We can define one or more tasks to run by default when executing `grunt` in the CLI

```js
// Default task(s).
grunt.registerTask('default', ['uglify']);
```

- Running these in the command line will do the same thing:

```js
grunt uglify
grunt default
grunt
```

****

UglifyJS
----------

> JavaScript compressor/minifier (and more)

[UglifyJS][]

****

### Setup an `uglify` task

#### Grunt plugin

[grunt-contrib-uglify][]

```js
npm install grunt-contrib-uglify --save-dev
```

#### Example

[Grunt Uglify Setup][]

****

### Result

```js
> grunt
Running "uglify:target" (uglify) task
>> 1 sourcemap created.
>> 1 file created.

Done, without errors.
```

#### Detailed Info

```js
grunt --verbose
```

****

### Notes

- `options` is per the Uglify docs, `target` can be whatever
- If multiple targets are set, they will run one after the other
- We can run one or more specific targets

```js
grunt uglify:target
grunt uglify:target:utils
```

****

### Exercise - 20m

- Create a simple `package.json` (use `npm init`)
- Install `grunt-cli` globally
- Install `grunt` locally (with `--save-dev`)
- Install `grunt-contrib-uglify` locally (with `--save-dev`)
- Create a `Gruntfile.js` file that sets up an `uglify` task
	- Compress `src/js/main.js` into `dist/js/main.min.js`
	- Use options: `banner`, `mangle`, `compress`, `sourceMap`
- Run `grunt`

****

JSHint
---------

> Detects errors and potential problems in JavaScript code

[JSHint][]

****

### Setup a `jshint` task

#### Grunt plugin

[grunt-contrib-jshint][]

```js
npm install grunt-contrib-jshint --save-dev
```

#### Example

[Grunt JSHint Setup][]

****

### Exercise - 10m

- Add a `jshint` task to run before the `uglify` task

****

Concat
---------

> Concatenate multiple files into a single file

****

### Setup a `concat` task

#### Grunt plugin

[grunt-contrib-concat][]

```js
npm install grunt-contrib-concat --save-dev
```

#### Example

[Grunt Concat Setup][]

****

### Exercise - 15m

- Save the `src` and `dest` folders settings in an object above the individual plugin's settings
	- Use `<%= %>` templates in the files paths to reference it
- Update the `jshint` task to check all files under `src/js`
- Add a `concat` task to run after the `jshint` task
	- Combine all `js` files under `src/js` into `dist/js/all.js`
- Update the `uglify` task to run on the end result file `all.js`

****

### Solution

- [Ex. Grunt JSHint/Concat/Uglify Solution][]

****

Watch
---------

> Do something when specific file(s) change

****

### Setup a `watch` task

#### Grunt plugin

[grunt-contrib-watch][]

```js
npm install grunt-contrib-watch--save-dev
```

#### Example

[Grunt Watch Setup][]

****

### Exercise - 10m

- Add a `watch` task that will watch all `js` files under `src/js` and trigger the `default` task on changes
- Run `grunt watch` to initialize



<!-- Reference -->

[Grunt]: http://gruntjs.com/

<!-- Tools -->

[UglifyJS]: http://lisperator.net/uglifyjs/
[grunt-contrib-uglify]: https://github.com/gruntjs/grunt-contrib-uglify
[JSHint]: http://jshint.com/
[grunt-contrib-jshint]: https://github.com/gruntjs/grunt-contrib-jshint
[grunt-contrib-concat]: https://github.com/gruntjs/grunt-contrib-concat
[grunt-contrib-watch]: https://github.com/gruntjs/grunt-contrib-watch

<!-- Examples -->

[Gruntfile.js]: http://codepen.io/netcraft/pen/GgobgK?editors=001
[Grunt Uglify Setup]: http://codepen.io/netcraft/pen/jEWjbB?editors=001
[Grunt JSHint Setup]: http://codepen.io/netcraft/pen/zxrVMe?editors=001
[Grunt Concat Setup]: http://codepen.io/netcraft/pen/yyedwq?editors=001
[Grunt Watch Setup]: http://codepen.io/netcraft/pen/QwyeKB?editors=001

<!-- In-Class Exercises -->

[Ex. Grunt JSHint/Concat/Uglify Solution]: http://codepen.io/netcraft/pen/Qwyeyx?editors=001
