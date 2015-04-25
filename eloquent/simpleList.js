var assert = {};
assert.isArray = function(obj) {
	return (obj !== undefined &&
			typeof(obj) === "object" &&
			obj.hasOwnProperty("0"));
};

var list = {
	value: null,
	rest: null
};

function arrayToList(arr)
{
	if (!assert.isArray(arr)) 
		throw new Error ("arrayToList: arr needs to be an array object");

	var link, nextLink = null;
	for (var i = arr.length - 1; i >= 0; --i) {
		link = Object.create(list);
		link.value = arr[i];
		link.rest = nextLink;
		nextLink = link;
	}
	return link;
}

function arrayToListRecur(arr)
{
	if (!assert.isArray(arr))
		throw new Error ("arrayToListRecur: arr needs to be an array object");

	function createLink(myArray, index) {
		if (index === undefined) index = 0;
		if (index > myArray.length) {
			return null;
		} else {
			var link;
			link = Object.create(list);
			link.value = myArray[index];
			link.rest = createLink(myArray, ++index);
			return link;
		}
	}

	return createLink(arr);
}

if (tests === undefined) var tests = {};
tests.simpleListTest = function() 
{
	var result = 0;

	function testArrayToList(atolver) {
		var li = atolver([ "a", "b", "c" ]);

		result += (li.value !== "a");
		result += (li.rest.value !== "b");
		result += (li.rest.rest.value !== "c");
	}

	testArrayToList(arrayToList);
	testArrayToList(arrayToListRecur);

	if (!result)	console.log("success");
	else			console.log("failure (" + result + ")");
	return result;
};

tests.simpleListTest();
