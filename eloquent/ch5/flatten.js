Array.isArrayOfArrays = function(obj)
{
	if (!Array.isArray(obj)) return false;
	obj.forEach(function(member) { if (!Array.isArray(member)) return false; } );
	return true;
};

function flatten(arrayOfArrays)
{
	if (!Array.isArrayOfArrays(arrayOfArrays)) 
		throw new Error("flatten argument must be an array of arrays");

	return arrayOfArrays.reduce( function(a, b) { return Array.concat(a, b); });
}

(function testFlatten()
{
	var result = 0;
	
	function test(condition, expectedResult) {
		if (test.testC === undefined) test.testC = 0;
		++(test.testC);

		if (eval(condition) !== expectedResult) {
			++result;
			console.log("(" + test.testC + ") failure");
		} else {
			console.log("(" + test.testC + ") success");
		}
	}

	var testArrays = [
		{ arr: [ [ 1, 2, 3 ], "hey", [ 3, 5 ,6 ] ],
			cond: null, res: "error" },
		{ arr: [ [ 1, 2, 3 ], { prop: null }, [ 3, 5 ,6 ] ],
			cond: null, res: "error" },
		{ arr: [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ],
			cond: "flattened[5] === 6 && flattened.length === 9", res: true }
	];

	var flattened = flatten(testArrays[2].arr);

	testArrays.forEach( 
					   function(testObj) {
						   var flattened = [];
						   error = false;

						   try {
							   flattened = flatten(testObj.arr);
						   } catch (e) { error = true; }

						   test(testObj.cond, testObj.res);
					   });

	return result;
})();
