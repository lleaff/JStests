function deepEqual()
{

}


function __deepEqualTest()
{
	var result = 0;

	function test(expression, expectedResult) {
		if (this.testN === undefined) this.testN = 1;
		var res = expression !== expectedResult;
		console.log("test n°" + testN++ + ": " +
					(res ? "failure" : "success"));
		result += res;
	}

	var testObj1 = {
		prop1: 4,
		prop2: {
			prop1: 9,
			fn1: function() { return 1; }
		}
	};

	var testObj2 = {
		prop1: 4,
		prop2: {
			prop1: 9,
			fn1: function() { return 1; }
		}
	};

	var testObj3 = {
		prop1: 4
	};
	
	var testObj4 = {
		prop1: 4,
		prop2: {
			prop1: 0
		}
	};

	test(deepEqual(testObj1, testObj2), true);
	test(deepEqual(testObj1, testObj3), false);
	test(deepEqual(testObj1, testObj4), false);

	console.log(result ? ("failure: " + result) : "success");
	return result;
}
__deepEqualTest();
