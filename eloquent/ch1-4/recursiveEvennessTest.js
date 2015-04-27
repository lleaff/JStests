var testC = 15;

var range = [-1000, 1000];

for (var i = 0; i < testC; ++i) {
	var testNum = Math.round(Math.random() * (range[1] - range[0]) + range[0]);
	console.log(testNum + " is " + (isEven(testNum) ? "even" : "odd") + ".");
}

function isEven(num)
{
	if (num < 0) num = -num;

	function recur(num) {
		if (num <= 1) return !num;
		else return recur(num - 2);
	}
	return recur(num);
}
