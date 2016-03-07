Custom Tasks
------------------

Basic Gruntfile with a custom task that doesn't use Grunt plugins or configuration

```js
module.exports = function (grunt) {
	grunt.registerTask('test', 'Log some stuff.', function () {
		grunt.log.writeln('Logging some stuff...').ok();
	});
};
```

- Check with `grunt -h`
- Run `test`

```js
> grunt test
Running "test" task
Logging some stuff...
OK

Done, without errors.
```

****

### Alias Tasks

> Setup a task name that runs other tasks, with optional arguments

```js
module.exports = function (grunt) {
	grunt.registerTask('test', 'Log some stuff.', function (str) {
		grunt.log.writeln(this.name, str);
	});
	
	grunt.registerTask('hi', ['test:hello', 'test:world']);
};
```

****

### Failing tasks

```js
grunt.registerTask('test', 'Say hi!', function (str) {
	if (!str) {
		grunt.log.error('Expecting an argument to be passed.');
		return false;
	}

	grunt.log.writeln(this.name, str);
});

grunt.registerTask('hi', ['test', 'test:World']);
```

- Subsequent tasks will be aborted
