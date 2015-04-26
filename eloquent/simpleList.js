var assert = {};

assert.isArray = function(obj) {
	return (obj !== undefined &&
			typeof(obj) === "object" &&
			obj.hasOwnProperty("0"));
};

assert.isList = function(obj) {
	return (obj !== undefined &&
		   typeof(obj) === "object" &&
		   obj.hasOwnProperty("value") &&
		   obj.hasOwnProperty("rest"));
};


var list = {
	value: null,
	rest: null,

	prepend: function(elem) {
		var newFirstLink = Object.create(list);
		newFirstLink.value = elem;
		newFirstLink.rest = this;
		return newFirstLink;
	},

	// Returns the value of the list's nth element
	nth: function(n) {
		function readLink(link, n) {
			if (n === 0)
				return link.value;
			else if (n < 0 || link.rest === null)
				return undefined;
			else 
				return readLink(link.rest, --n);
		}
		return readLink(this, n);
	}
};

function createList()
{
	var args = arguments;
	function createLink(i) {
		if (i >= args.length) {
			return null;
		} else {
			var link = Object.create(list);
			link.value = args[i];
			link.rest = createLink(++i);
			return link;
		}
	}

	return createLink(0);
}

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
		throw new Error ("arrayToListRecur(): arr needs to be an array object");

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


function listToArray(myList)
{
	if (!assert.isList(myList))
		throw new Error ("listToArray(): myList needs to be a list object");

	var myArray = [];
	for (var i = 0; myList !== null; ++i) {
		myArray[i] = myList.value;
		myList = myList.rest;
	}

	return myArray;
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


	function testListToArray(ltoaver) {
		var ar = ltoaver(createList("a", "b", "c"));

		result += (ar[0] !== "a");
		result += (ar[2] !== "c");
	}

	testListToArray(listToArray);


	{
		var li = createList("a", "b", "c");
		li = li.prepend("z");

		result += (li.value !== "z");
		result += (li.nth(3) !== "c");
		result += (li.nth(-1) !== undefined);
		result += (li.nth(4) !== undefined);
	}


	if (!result)	console.log("success");
	else			console.log("failure (" + result + ")");
	return result;
};

tests.simpleListTest();
