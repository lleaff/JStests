function range(startInt, endInt) {
	// Type check
	if ((typeof(startInt) !== "number" || typeof(endInt) !== "number" ) || 
		(startInt % 1 !== 0 || endInt % 1 !== 0))
		throw new Error("range() arguments must be integer numbers");

	var arr = [];
	for (var i = startInt; i <= endInt; ++i)
		arr.push(i);
	return arr;
}

function sum(numArray) {
	// Type check
	if (typeof(numArray) !== "object" || !numArray.hasOwnProperty("0"))
		throw new Error("sum() argument must be an array of numbers");

	var result = 0;
	for (var i = 0; i < numArray.length; ++i)
		result += numArray[i];
	return result;
}
