function range(startInt, endInt) {
	// Type check
	if ((typeof(startInt) !== "number" || typeof(endInt) !== "number" ) || 
		(startInt % 1 !== 0 || endInt % 1 !== 0))
		throw new Error("range arguments must be integer numbers");

	var arr = [];
	for (var i = startInt; i <= endInt; ++i)
		arr.push(i);
	return arr;
}
