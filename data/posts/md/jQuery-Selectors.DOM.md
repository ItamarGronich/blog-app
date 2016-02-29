jQuery
======

****

Selectors
-------------

***

### `jQuery( selector [, context ] )`

**selector**
Type: Selector
A string containing a selector expression

**context**
Type: Element or jQuery
A DOM Element, Document, or jQuery to use as context

Example:
<http://codepen.io/netcraft/pen/WbvgoB>

***

### `jQuery( element )`

**element**
Type: Element
A DOM element to wrap in a jQuery object.

Example:
<http://codepen.io/netcraft/pen/jEPvVg>

***

### `jQuery( elementArray )`

**elementArray**
Type: Array
An array containing a set of DOM elements to wrap in a jQuery object.

Example:
<http://codepen.io/netcraft/pen/MYwqJw>

***

### `jQuery( selection )`

**selection**
Type: jQuery
An existing jQuery object to clone.

Example:
<http://codepen.io/netcraft/pen/qEdMRj>

***

### `.filter()` vs. `.find()`

```js
$( "ul" )
  .find( "li" )
  .filter( ":even" );
```

Example:
<http://codepen.io/netcraft/pen/MYwqpw>

***

### Chaining with `.end()`

some jquery function return a jquery object which allow chaining (usually manipulative function)

```js
$( "li" )
  .filter( ":even" )
    .end()
  .filter( ":odd" );
```

Preformance check:
<http://jsperf.com/jquery-chaining-vs-separation/2>

Example:
<http://codepen.io/netcraft/pen/WbvgpB>

***

### `.get(index)` vs. `[index]`

if one want to get the element  without the jquery wrapper he can use .get() or the array notation

```js
// will get the first element
$('li').get(0);
$('li')[0];

// will get the entire element array
$('li').get();
```

Performance check:
<http://jsperf.com/jquery-array-access-vs-get-method>

***

### `.eq()`

Reduce the set of matched elements to the one at the specified index

```js
$( "ul" )
  .find( "li" )
  .eq( 2 );
```

***

### `.each()`

Iterate over a jQuery object, executing a function for each matched element

****

Manipulation
-----------------

***

### Attributes

#### `.attr()` vs . `prop()`

.prop() refer to property, when working with elements it first iterate the object properties and then search in the object attributes.

Get attribute:

```js
$( "p" ).html( ".attr( 'checked' ): <b>" + $input.attr( "checked" );
```

Set attribute

```js
$( "#greatphoto" ).attr( "alt", "Beijing Brush Seller" );
```

Example:
<http://codepen.io/netcraft/pen/zxGRWJ>

***

#### `.val()`

get the current value of the first element in the set of matched elements.

```js
$( ".someinput" ).val();
```

Example:
<http://codepen.io/netcraft/pen/raVqMY>

***

#### `.serialize()`

serialize the entire form to query string

```js
$( "form" ).serialize();
```

***

#### `.position()` & `.offset()`

##### `.offset()`

Description: Get the current coordinates of the first element in the set of matched elements, **relative to the document.**

##### `.position()`

Description: Get the current coordinates of the first element in the set of matched elements, **relative to the offset parent.**


#### `.text()`

Get the combined text contents of each element in the set of matched elements, including their descendants

```js
$( "div.demo-container" ).text();
```

Example:
<http://codepen.io/netcraft/pen/MYwPmv>

***

### Style

#### `.css()`

Get the value of a style property for the first element in the set of matched elements or set one or more CSS properties for every matched element

```js
$( "li" ).filter( ":even" ).css( "background-color", "red" );
```

Example:
<http://codepen.io/netcraft/pen/jEPZEM>

****

> Exercise:
> [jQuery Basics][]

***

> Solution
> [jQuery Basics Solution][]

****

### Creating elements

#### `jQuery( html [, ownerDocument ] )` & `.appendTo()`

**html**
Type: htmlString
A string of HTML to create on the fly. Note that this parses HTML, not XML.

**ownerDocument**
Type: document
A document in which the new elements will be created.

```js
$('<div>text</div>').appendTo('body');
```

Example:
<http://codepen.io/netcraft/pen/gbpQxR>

***

#### `.append()` & `.appendTo()`

Insert content, specified by the parameter, to the end of each element in the set of matched elements

```js
$( ".container" ).append( $( "h2" ) );
```

***

#### `jQuery( html, attributes )`

**html**
Type: htmlString
A string defining a single, standalone, HTML element (e.g. `<div/>` or `<div></div>`).

**attributes**
Type: PlainObject
An object of attributes, events, and methods to call on the newly-created element.

Example:
<http://codepen.io/netcraft/pen/raVQzb>

***

#### `.wrap()` & `.unwrap()` & `.wrapAll()`

Wrap an HTML structure around each element in the set of matched elements

```js
$( ".inner" ).wrap( "<div class='container'></div>" );
```

Example:
<http://codepen.io/netcraft/pen/GgJVMX>

***

#### `.html()`

 Get the HTML contents of the first element in the set of matched elements.

```js
$( "div.demo-container" ).html();
```

Example:
<http://codepen.io/netcraft/pen/emNqPB>

***

### DOM Removal

#### `.empty()` & `.remove()`

Remove all child nodes of the set of matched elements from the DOM.

```js
$( ".container" ).empty();
```

Remove the set of matched elements from the DOM.

```js
$( ".inner" ).remove();
```

`remove()`
<http://codepen.io/netcraft/pen/LEVwMQ>

`empty()`
<http://codepen.io/netcraft/pen/NPqQoK>



<!-- In-Class Exercises -->

[jQuery Basics]: http://codepen.io/netcraft/pen/QwbZqd?editors=001
[jQuery Basics Solution]: http://codepen.io/netcraft/pen/empaQy?editors=001
[jQuery Events]: http://codepen.io/netcraft/pen/myeYzN?editors=001
[jQuery Events Solution]: http://codepen.io/netcraft/pen/wBKbQM?editors=001
[jQuery Ajax]: http://codepen.io/netcraft/pen/wBKJrR?editors=001
[jQuery Ajax Solution]: http://codepen.io/netcraft/pen/myeYZd?editors=001
