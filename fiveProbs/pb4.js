var tests = [
	[ 1, 2, 3, 4, 5 ],
	[ 50, 8000, 39, 800, 100 ],
	[ 0, 5, 54 ]
];
tests.forEach(function(a){ console.log(makeBiggestNum(a)); });

function makeBiggestNum(arr) {
	var num = "";
	while (arr.length) {
		var bestI = 0;
		for (var i = 1; i < arr.length; ++i)
			if ((""+arr[i]+arr[bestI]>>0) > (""+arr[bestI]+arr[i]>>0))
				bestI = i;
		num = ""+num+arr[bestI];
		arr.splice(bestI, 1);
	}
	return num;
}
