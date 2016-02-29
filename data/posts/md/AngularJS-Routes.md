Routes
---------

***

### `routeProvider` API

Allows create `routes`, so the app can have re-usable and linkable URLs like:
`http://domain.com/#/deck/1/card/0`

```js
angular.module('app', ['ngRoute']);

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/decks', {
			templateUrl: 'partials/decks.html',
			controller: 'DecksController'
		})
		.when('/deck/:deckId/card/:cardId', {
			templateUrl: 'partials/card.html',
			controller: 'CardController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
```

***

#### Notes:

There are two functions used to setup modules.

- `.config()` - Setup app configuration (runs fist)
- `.run()` - Run some app init code after all Services are ready

Also, `ngRoute` is a separate module that needs to be loaded after `angular.js` (download or load from a CDN)

***

### `routeParams`

Let's say we have a route that looks like:

```js
$routeProvider.when('/deck/:deckId/card/:cardId', {});
```

`:deckId` and `:cardId` can be used as parameters inside the controllers:

```js
myApp.controller('CardController', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		var cardId;
		var deckId;

		function init() {
			cardId = parseInt($routeParams.cardId, 10);
			deckId = parseInt($routeParams.deckId, 10);
		}

		init();
	}]
);
```

***

### `ng-view`

> `ng-view` is the glue between the route and the DOM.

When a route is loaded, the HTML will be replaced with the Template, with an optional Controller to handle that Template Scope.

__Usage:__

```html
<ng-view></ng-view>
<!-- Or... -->
<div ng-view></div>
```

- [Example](http://plnkr.co/edit/LRU5vzSrHpmpMtX3polb?p=preview)

***

### `ng-include`

`ng-include` is the poorer cousin of `ng-view`.  It simply allows you to inject another piece of HTML into your template, like so:

```html
<ng-include src=" 'header.html' "></ng-include>
```

or...

```html
<div ng-include=" 'header.html' "></div>

```

- Note that the value it expects is an expression, so it could be a variable, a function call or a string with a file path (must be inside `''`)
- The value itself can also be a reference to a template ID in the same file, or raw HTML

***

### Redirects

Once you have routes set up, you can tell one route to redirect to another.

Redirect to specific route:

```js
.when('/home', {
	redirectTo : '/'
});
```

Redirect if no route was matched (fallback)

```js
.otherwise({
	redirectTo : '/'
});
```

***

### `$routeChangeStart`

Allows running some code when routes change.

For instance, if you want to redirect to the login page if the user isn't logged in, and redirect FROM the login page if the user is logged in.

***

```js
myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl : 'login.html',
			isLogin : true
		})
}]);

myApp.run(['$rootScope', '$location',
	function ($rootScope, $location, server) {
		
	// register listener to watch route changes
	$rootScope.$on("$routeChangeStart",
		function (event, next, current) {
			
		if (!server.isLoggedIn() && !next.isLogin) {
			$location.path( "/login" );
		}
		if (server.isLoggedIn() && next.isLogin) {
			$location.path("/");
		}
	});
}]);
```
