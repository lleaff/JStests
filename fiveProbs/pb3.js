function buildFiboArr(length)
{
	var fibo = [0, 1];
	if (length <= 2) {
		return fibo.slice(0, length);
	}
	(function helper(length) {
		if (length)
			fibo.push(helper(--length));
		return fibo[fibo.length - 1] + fibo[fibo.length - 2];

	})(length - 2);
	return fibo;
}

var fibo = buildFiboArr(100);
console.log(fibo);
