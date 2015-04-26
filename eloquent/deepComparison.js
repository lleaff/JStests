var debug = false;
function DEBUG(str) { if (debug) console.log("DEBUG   " + str); }

function deepEqual(obj1, obj2)
{
	if (typeof(obj1) === "function") {
		if (typeof(obj2) !== "function") return false;
		else return ""+obj1 === ""+obj2;
	} else if (typeof(obj1) !== "object" || obj1 === null) {
		if (obj1 !== obj2)  {
			DEBUG(obj1 + "!== " + obj2);
			return false;
		}
	} else {
		for (var prop in obj1) {
			if (!obj2.hasOwnProperty(prop)) {
				DEBUG("!obj2.hasOwnProperty(" + prop + ")");
				return false;
			} else {
				if (!deepEqual(obj1[prop], obj2[prop])) {
					DEBUG("!deepEqual("+ obj1[prop] +", "+ obj2[prop] +")");
					return false;
				}
			}
		}
	}
	return true;
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
