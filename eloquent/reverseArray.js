var assert = {};
assert.isArray = function(obj) 
{
	return (obj !== undefined &&
		   typeof(obj) === "object" &&
		   obj.hasOwnProperty("0"));
};

function reversedArray(arrayToReverse)
{
	// Type check
	if (!assert.isArray(arrayToReverse)) {
		throw new Error("reverseArray's argument must be an array");
	}

	var arr = [];

	var tmp;
	for (var i = 0; i < arrayToReverse.length; ++i) {
		arr[i] = arrayToReverse[arrayToReverse.length - 1 - i]; 
	}

	return arr;
}
