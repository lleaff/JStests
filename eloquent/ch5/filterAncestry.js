if (ANCESTRY_FILE === undefined)
	throw new Error("ANCESTRY_FILE undefined, include ancestry");

var ancestry = JSON.parse(ANCESTRY_FILE);

console.log("length: "+ancestry.length);

console.log("JSON.stringify(): \n"+
			JSON.stringify(ancestry[3], ["name", "sex", "born", "died"], 1));
console.log("ancestry[3].name: "+ancestry[3].name);
