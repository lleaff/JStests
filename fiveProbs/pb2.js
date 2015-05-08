var array1 = [1, 2, 3, 4, 5, 6];
var array2 = ["a", "b", "c"];

function mixArrays(arr1, arr2)
{
	var mixed = [];
	for (var i = 0, j = 0; i < arr1.length || j < arr2.length; ++i, ++j) {
		if (i < arr1.length)
			mixed.push(arr1[i]);
		if (j < arr2.length)
			mixed.push(arr2[j]);
	}
	return mixed;
}

var mixedArray = mixArrays(array1, array2);
console.log(mixedArray);
