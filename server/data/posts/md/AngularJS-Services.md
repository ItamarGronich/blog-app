Services
----------

***

> Services are probably the easiest piece to understand in Angular. They're cross-application, and easy to inject and use.  A service is a nice name for an Angular singleton.

***


### Creating a Service

We use the same pattern we've seen a lot:

```js
myApp.factory('myService', ['$location', function ($location) {
	function saveFn(){

	}

	function deleteFn(){

	}

	return {
		save: saveFn,
		delete: deleteFn
	}
}
}]);
```

***

### `service` vs. `factory`

Sometimes, you'll see this:

```js
myApp.service('myService', [function () {}])
```

and sometimes this:

```js
myApp.factory('myService', [function () {}]);
```

So what's the difference?

- [StackOverflow - angular.service vs angular.factory](http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory)

__Bottom line:__

- Any time you WOULD use `new`, use `service`
- And if you WOULDN'T use `new`, use `factory`

***

### Use-cases for services

* Utility functions
* Server communication encapsulation
* Managing your model across your app
