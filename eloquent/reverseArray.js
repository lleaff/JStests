function reversedArray(arrayToReverse)
{
	// Type check
	if (arrayToReverse === undefined || 
		typeof(arrayToReverse) !== "object" || 
			!arrayToReverse.hasOwnProperty("0")) {
		throw new Error("reverseArray's argument must be an array");
	}

	var arr = [];

	var tmp;
	for (var i = 0; i < arrayToReverse.length; ++i) {
		arr[i] = arrayToReverse[arrayToReverse.length - 1 - i]; 
	}

	return arr;
}
