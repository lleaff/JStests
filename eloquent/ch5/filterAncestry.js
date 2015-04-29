if (ANCESTRY_FILE === undefined)
	throw new Error("ANCESTRY_FILE undefined, include ancestry");

var ancestry = JSON.parse(ANCESTRY_FILE);
ancestry.getDeathAge = function(indexOrObject)
{
	if (indexOrObject === undefined) 
		throw new Error("indexOrObject: no argument");

	var obj;
	if		(typeof(indexOrObject) === "object") obj = indexOrObject;
	else if	(typeof(indexOrObject) === "number") obj = this[indexOrObject];
	return (obj.died - obj.born);
};

console.log("length: "+ancestry.length);

console.log("JSON.stringify(): \n" +
			JSON.stringify(ancestry[3], ["name", "sex", "born", "died"], 1) +
			"\"age\":" + ancestry.getDeathAge(3));
console.log("ancestry[3].name: " + ancestry[3].name);

function arrayFilter(array, test)
{
	var valid = [];
	for (var i = 0; i < array.length; ++i)
		if (test(array[i]))
			valid.push(array[i]);
	return valid;
}

var deathAgeLimit = 80;
console.log("\nPeople who lived longer than " + deathAgeLimit + " years old:\n");
arrayFilter(ancestry, 
			function(a) { return ancestry.getDeathAge(a) > deathAgeLimit; } 
		   ).forEach(function(a) { console.log(a.name); });
