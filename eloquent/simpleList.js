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

function __simpleListTest()
{
	var result = 0;

	var li = arrayToList([ "a", "b", "c" ]);

	result += (li.value !== "a");
	result += (li.rest.value !== "b");
	result += (li.rest.rest.value !== "c");

	if (!result)	console.log("success");
	else			console.log("failure (" + result + ")");
	return result;
}
