function deepEqual()
{

}


function __deepEqualTest()
{
	var result = 0;

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
		prop1: 4,
		prop2: {
			prop1: 0
		}
	};

	result += (!deepEqual(testObj1, testObj2));
	result += (deepEqual(testObj1, testObj3));

	console.log(result ? ("failure :" + result) : "success");
	return result;
}
__deepEqualTest();
