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

drawSeparator("=");

function toBase(base, decimalInt)
{
	if (!(typeof(base) === typeof(decimalInt) && typeof(base) === "number"))
		throw new Error("toBase: base and number arguments must be of type \"number\"");

	function numToDigit(num)
	{
		if (num > 36) throw new Error("toBase("+decimalInt+"): numToDigit("+num+"): base > 36 not supported");
		if (num % 1) console.log("[Warning]: "+num+" is not an integer, flooring it to "+Math.floor(num));
		if (num < 10)
			return Math.floor(num).toString();
		else
			return String.fromCharCode("A".charCodeAt(0) + Math.floor(num) - 10);
	}

	return (
		function helper(str, decimalInt)
		{
			if (decimalInt < base) {
				return numToDigit(decimalInt);
			} else {
				return helper(str, Math.floor(decimalInt / base)) + numToDigit(Math.floor(decimalInt % base));
			}
		}
	)("", decimalInt);
}

var toHex = toBase.bind(null, 16);

var testToBaseVals = [ 1, 10, 15, 16, 25, 255, 10000 ];

testToBaseVals.forEach(function(a) { console.log(a+": "+toHex(a)); });
