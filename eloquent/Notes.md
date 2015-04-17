# Eloquent JavaScript
=========================

## Value types

### Numbers
    8.5
	2.0369e-12

### Special numbers
    Infinity	-Infinity
    NaN  <- 0 / 0  or Infinity - Infinity
	NaN != NaN

### Strings
    Enclosed by " or '
    Has to stay on a single line, need to use \n
    Can be concatenated with + ("black" + " cat" => "black cat")

### Boolean
    3 > 2
	true

### Undefined values
    null   undefined
	Some operations produce 'undefined'
	null and undefined are pretty much interchangeable

### Operators

#### Unary

    typeof	Produces a string: 
	typeof 4.5 => "number"

### Binary

Comparison operators

    ==	Performs comparison with type coercion
	"5" == 5	=> true
	"5" != 5	=> false
	===	Performs comparison without type coercion
	"5" === 5	=> false
	"5" !== 5	=> true

For safety always use three character comparison operators by default

Logic operators

    && and || work on all value types
	&& returns the first value to evaluate to false, otherwise returns the first value
	|| returns the first value to evaluate to true, otherwise returns the last value

#### Ternary
?

    Conditional expression
	cond ? ifTrue : ifFalse;

## Automatic type conversion

Unexpected results:

    console.log(8*null)
	// 0
	console.log("5" - 1)
	// 4
	console.log("5" + 1)
	// 51
	(^ conversion to string takes precedence)
	console.log("five" * 2)
	// NaN
	console.log(true + 4)
	// 5

## Variables

Case-sensitive
Symbols allowed: 

    [a-z] [A-Z] [0-9] _ $

No '-' allowed
Cannot begin with [0-9]

## Functions

No function overloading
Each function is an object
Functions have an "argument" property which is an object of itself
    argument.length		// Number of arguments
