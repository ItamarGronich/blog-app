Modules
----------

### What is a module?

> You can think of a module as a container for the different parts of your app – Controllers, Services, Filters, Directives, etc.

***

### Why do we need it?

Most applications have a main method that instantiates and wires together the different parts of the application.

Angular apps don't have a main method. Instead, modules declaratively specify how an application should be bootstrapped. There are several advantages to this approach:

* The declarative process is easier to understand.
* You can package code as reusable modules.
* The modules can be loaded in any order (or even in parallel) because modules delay execution.
* Unit tests only have to load relevant modules, which keeps them fast.
* End-to-end tests can use modules to override configuration.

***

### Recommended Setup

Break your application to multiple modules:

* A module for each feature
* A module for each reusable component (especially Directives and Filters)
* An application level module which depends on the above modules and contains any initialization code.

***

### Module setup

HTML:

```handlebars
<div ng-app="myApp">
	<div>
		{{ 'World' | greet }}
	</div>
</div>
```

JS:

```js
// Declare a module
var app = angular.module('myApp', []);

// Configure the module
// Adding a greeting filter
app.filter('greet', function () {
	return function (name) {
		return 'Hello, ' + name + '!';
	};
});
```

***

### Dependency injection in modules

```js
var app = angular.module('myApp', ['Module2', 'Module3']);
```

That's how you include other modules as dependencies of the main one.

- [More info on modules](https://docs.angularjs.org/guide/module)
