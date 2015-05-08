var numbers = [ 99, 88, 77, 66, 55, 44, 33, 22, 11 ];

function sumFor(arr)
{
	var result = 0;
	for (var i = 0; i < arr.length; ++i) {
		result += arr[i];
	}
	return result;
}

console.log("for loop:\t" + sumFor(numbers));

function sumWhile(arr)
{
	var result = 0;
	var i = 0;
	while (i < arr.length) {
		result += arr[i++];
	}
	return result;
}

console.log("while loop:\t" + sumWhile(numbers));

function sumRecur(arr)
{
	if (!arr.length)
		return 0;
	else
		return arr.pop() + sumRecur(arr); /* /!\ Array.pop modifies the array */
}

console.log("recursion:\t" + sumRecur(numbers));
