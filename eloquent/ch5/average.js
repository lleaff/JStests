function average(arr)
{
	function add(a, b) { return a + b; }
	return arr.reduce(add) / arr.length;
}

/* =Tests
 * ------------------------------------------------------------ */
function randInt(lowerLimit, upperLimit)
{
	return Math.round(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
}

function randomIntArray(length, lowerLimit, upperLimit)
{
	/* Default values */
	if (length === undefined) length = 7;
	if (lowerLimit === undefined) lowerLimit = 0;
	if (upperLimit === undefined) {
		if (lowerLimit === undefined) upperLimit = 10;
		else upperLimit = (lowerLimit || 1) * 10;
	}

	var arr = [];
	(function fill(length, lowerLimit, upperLimit) {
		if (length) arr.push(fill(--length, lowerLimit, upperLimit));
		return randInt(lowerLimit, upperLimit);
	})(length, lowerLimit, upperLimit);
	return arr;
}

var testArr = randomIntArray(10, 0, 10);
