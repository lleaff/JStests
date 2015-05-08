function getToWith(getTo, nums) 
{
	var operations = [ "+", "-", "" ];

	var solutions = [];

	(function helper(pos, process) {
		if (pos >= nums.length) {
			if (eval(process) === getTo) // jshint ignore:line
				solutions.push(process);
			return;
		} else {
			operations.forEach(function(a){
				helper(pos + 1, process + a + nums[pos]);
			});
		}
	})(1, ""+nums[0]);

	return solutions;
}

var getTo100 = getToWith.bind(null, 100, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);

var solutions = getTo100();
solutions.forEach(function(a){ console.log(a); });
