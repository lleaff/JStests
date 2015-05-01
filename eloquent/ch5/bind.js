function drawSeparator(str, width) {
	if (str === undefined) str = "-";
	if (width === undefined) width = 79;
	console.log(Array(width).join(str));
}

var testArr = [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ];

var evenArr = testArr.filter(function(a) { return a % 2 === 0; });

evenArr.forEach(console.log, console);

drawSeparator();

// Direct console.log bind doesn't work well with forEach because 
//   forEach provides too many arguments (value, index, array)
evenArr.forEach(console.log.bind(console, ">"));

drawSeparator();

evenArr.forEach(function(a) { console.log(a); });
