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

Array.prototype.print = function() {
	var str = "";
	for (var i = 0; i < this.length; ++i)
		str += this[i] + ((i == this.length - 1) ? "" : ", ");
		console.log(str);
};

/* Execution */
console.log("Deviation: " + (function test(testC) {
	var expectedAverage = 5;
	var range = [0, 10];
	var averages = [];
	for (testArr = []; testC > 0; --testC) {
		testArr = randomIntArray(10, range[0], range[1]);
		averages.push(average(testArr));
	}
	return Math.abs(average(averages) - expectedAverage);
})(100000));
