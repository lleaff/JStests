function powRecur(base, exponent)
{
	if (exponent === 0) {
		return 1;
	} else {
		return base * powRecur(base, --exponent);
	}
}

function powLoop(base, exponent)
{
	result = 1;
	for (var i = exponent; i > 0; --i) {
		result *= base;
	}
	return result;
}

console.log("2^10 =");

console.log("Recur:");
console.log(powRecur(2, 10));

console.log("Loop:");
console.log(powRecur(2, 10));
