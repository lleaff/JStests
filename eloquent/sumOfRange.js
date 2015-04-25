function range(startInt, endInt, step, forceEnd) {
	if (step === undefined)		step = 1;
	if (forceEnd === undefined)	forceEnd = false;
	// Type check
	if (typeof(startInt) !== "number" || typeof(endInt) !== "number" ||
		typeof(step) !== "number")
		throw new Error("range() arguments must be integer numbers");

	var arr = [];
	for (var i = startInt; ; i += step) {
		if ((step > 0 && i > endInt) || (step < 0 && i < endInt)) {
			if (forceEnd && (i - step) !== endInt)
				arr.push(endInt);
			break;
		}
		arr.push(i);
	}
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
