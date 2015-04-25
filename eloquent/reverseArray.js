var assert = {};
assert.isArray = function(obj) 
{
	return (obj !== undefined &&
		   typeof(obj) === "object" &&
		   obj.hasOwnProperty("0"));
};

function reverseArray(arrayToReverse)
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

function reverseArraytest() {
	var normalArr = [ 1, 2, 3 ];
	var reversedArray = reverseArray(normalArr);
	reverseArrayInPlace(normalArr);

	if (reversedArray[2] !== 1 || normalArr[0] !== 3) return "failure";
	else return "success";
}
