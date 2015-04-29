if (ANCESTRY_FILE === undefined)
	throw new Error("ANCESTRY_FILE undefined, include ancestry");

var ancestry = JSON.parse(ANCESTRY_FILE);
ancestry.getAge = function(index)
{
	return (this[index].died - this[index].born);
};

console.log("length: "+ancestry.length);

console.log("JSON.stringify(): \n" +
			JSON.stringify(ancestry[3], ["name", "sex", "born", "died"], 1) +
			"\"age\":" + ancestry.getAge(3));
console.log("ancestry[3].name: " + ancestry[3].name);
