var range = [1, 100];

for (var i = range[0]; i <= range[1]; ++i) {
	if     (i % 15 === 0)	console.log("FizzBuzz");
	else if(i % 3 === 0)	console.log("Fizz");
	else if(i % 5 === 0)	console.log("Buzz");
	else 					console.log(i);
}
