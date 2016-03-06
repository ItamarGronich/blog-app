Events
----------

***

### Mouse Events

#### `.click()` & `.dblclick()`

Bind an event handler to the "click" JavaScript event, or trigger that event on an element.

```js
$( "#other" ).click(function() {
  $( "#target" ).click();
});
```

Example:
<http://codepen.io/netcraft/pen/pvjoPZ>

***

#### `.hover()`

Bind two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements `.mouseenter() .mouseleave()`.

```js
$( "li.fade" ).hover(function() {
  $( this ).fadeOut( 100 );
  $( this ).fadeIn( 500 );
});
```

Example:
<http://codepen.io/netcraft/pen/wBKveP>

***

### Keyboard Events

#### `.keydown()` & `.keypress()` & `.keyup()`

Bind an event handler to the "keydown"/"keypress"/"keyup" JavaScript event, or trigger that event on an element.

```js
$( "#target" ).keydown(function() {
  alert( "Handler for .keydown() called." );
});
```

Example:
<http://codepen.io/netcraft/pen/jEbOGK>

***

### Form Events

#### `.change()`

Bind an event handler to the "change" JavaScript event, or trigger that event on an element.

```js
$( ".target" ).change(function() {
  alert( "Handler for .change() called." );
});
```

***

#### `.submit()`

Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.

```js
$( "#target" ).submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});
```

Example:
<http://codepen.io/netcraft/pen/EaVajP>

***

#### Alias to `on()`

```js
jQuery.each( ("blur focus focusin focusout load resize scroll unload click " +
  "dblclick mousedown mouseup mousemove mouseover mouseout mouseenter " +
  "mouseleave change select submit keydown keypress keyup error " +
  "contextmenu").split(" "), function( i, name ) {

  // Handle event binding
  jQuery.fn[ name ] = function( data, fn ) {
    return arguments.length > 0 ?
      this.on( name, null, data, fn ) :
      this.trigger( name );
  };
});
```

***

#### `.off()` & `.once()`

Example:
<http://codepen.io/netcraft/pen/empWBR?editors=001>

***

#### Pub/Sub register custom events

```js
$('.item').on('customEvent', function() {
  // do something
});

$('.item').trigger('customEvent');
```

***

#### Event delegation with `.on()`

Example:
<http://codepen.io/netcraft/pen/yyeoJw?editors=001>

****

> Exercise:
> [jQuery Events][]

***

> Solution
> [jQuery Events Solution][]

****

Ajax
------

***

### `jQuery.get()` & `jQuery.post()` & `jQuery.getJSON()`

Load data from the server using an HTTP GET/POST/JSONP request

```js
var jqxhr = $.get( "example.php", function() {
  alert( "success" );
})
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "finished" );
  });
```
```js
jQuery.get( url [, data ] [, success ] [, dataType ] )
jQuery.post( url [, data ] [, success ] [, dataType ] )
jQuery.getJSON( url [, data ] [, success ] )
```

***

### `jQuery.ajax([ settings ])`

Perform an asynchronous HTTP (Ajax) request.

```js
var request = $.ajax({
  url: "script.php",
  type: "POST",
  data: { id : menuId },
  dataType: "html"
});
```

**settings:**

- async
- crossDomain
- data
- dataType
- jsonp
- more ...

Example:
<http://codepen.io/netcraft/pen/EaVVVM>

***

### `.load()`

Load data from the server and place the returned HTML into the matched element.


### `jQuery.param()`

Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.

****

> Exercise
> [jQuery Ajax][]

***

> Solution:
> [jQuery Ajax Solution][]



<!-- In-Class Exercises -->

[jQuery Basics]: http://codepen.io/netcraft/pen/QwbZqd?editors=001
[jQuery Basics Solution]: http://codepen.io/netcraft/pen/empaQy?editors=001
[jQuery Events]: http://codepen.io/netcraft/pen/myeYzN?editors=001
[jQuery Events Solution]: http://codepen.io/netcraft/pen/wBKbQM?editors=001
[jQuery Ajax]: http://codepen.io/netcraft/pen/wBKJrR?editors=001
[jQuery Ajax Solution]: http://codepen.io/netcraft/pen/myeYZd?editors=001
