Controllers - Extra topics
----------------------------

***

### $scope and functions on $scope

The `$scope` basically serves as the data model.

More info from the Angular website:

* Scopes provide APIs (`$watch`) to observe model mutations.

* Scopes provide APIs (`$apply`) to propagate any model changes through the system into the view from outside of the "Angular realm" (Controllers, Services, Angular event handlers).

* Scopes can be nested to limit access to the properties of application components while providing access to shared model properties. Nested scopes are either __child scopes__ or __isolate scopes__. A __child scope__ (prototypically) inherits properties from its parent scope. An __isolate scope__ does not.

* Scopes provide context against which expressions are evaluated. For example, a `{{userName}}` expression is meaningless, unless it is evaluated against a specific scope which defines the `userName` property.

***

### Prototypal inheritance

There is always one root scope, but chlid scopes can exist, and they inherit (prototypically) from their parent scope(s):

```handlebars
<div ng-app="scopeExample">
	<div class="show-scope-demo">
		<div ng-controller="GreetController">
			Hello {{name}}!
		</div>
		
		<div ng-controller="ListController">
			<ol>
				<li ng-repeat="name in names">
					{{name}} from {{department}}
				</li>
			</ol>
		</div>
	</div>
</div>
```

***

```js
angular.module('scopeExample', [])

.controller('GreetController', ['$scope', '$rootScope', 
	function ($scope, $rootScope) {
		$scope.name = 'World';
		$rootScope.department = 'Angular';
	}
]);

.controller('ListController', ['$scope',
	function ($scope) {
		$scope.names = ['Igor', 'Misko', 'Vojta'];
	}
]);
```

***

```css
.show-scope-demo.ng-scope,
.show-scope-demo .ng-scope  {
	border: 1px solid red;
	margin: 3px;
}
```

***

### Passing by reference/value

Remember that there is difference between this:

```js
var str = 'string';

function updateString(strParam) {
	strParam = 'other string';
}
updateString(str);
console.log(str);
```

And this:

```js
var strObject = {
	str: 'string'
};
function updateString(strParam) {
	strParam.str = 'other string';
}
updateString(strObject);
console.log(strObject.str);
```

***

So too, this:

```handlebars
<div ng-app="scopeExample">
	<div ng-controller="ParentController">
		<input type="text" ng-model="name">
		Hello {{name}}!
		<div ng-controller="ChildController">
			<input type="text" ng-model="name">
			Hello {{name}}!
		</div>
	</div>
</div>
```

```js
angular.module('scopeExample', [])
	.controller('ParentController', ['$scope',
		function ($scope) {
			$scope.name = 'World';
		}
	])
	.controller('ChildController', ['$scope',
		function ($scope) { /* ... */ }
	]);
```

***

is different than this:

```handlebars
<div ng-app="scopeExample">
	<div ng-controller="ParentController">
		<input type="text" ng-model="data.name">
		Hello {{data.name}}!
		<div ng-controller="ChildController">
			<input type="text" ng-model="name">
			Hello {{data.name}}!
		</div>
	</div>
</div>
```

```js
angular.module('scopeExample', [])
	.controller('ParentController', ['$scope',
		function ($scope) {
			$scope.data = {
				name: 'World'
			};
		}
	])
	.controller('ChildController', ['$scope',
		function ($scope) { /* ... */ }
	]);
```

***

### "`Controller as`" syntax

[AngularJS.org - ngController](https://docs.angularjs.org/api/ng/directive/ngController)
[Controller As - Example](http://plnkr.co/edit/EndHxw6QcY3dKAZZhEXD?p=preview)

***

### Built-In `$scope` methods

__`$watch`__

> Allows listening to variables changes.

```js
$scope.$watch(
	'sampleVar',

	// This is the change listener, called when the value returned from the above function changes
	function(newValue, oldValue) {
		if ( newValue !== oldValue ) {
			console.log(newValue, oldValue);
			$scope.sampleVar2 = $scope.sampleVar + $scope.sampleVar;
		}
	},
	false
);
```

- Affects performance if used a lot or if doing heavy lifting. Don't abuse it! 
