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
