if (ANCESTRY_FILE === undefined)
	throw new Error("ANCESTRY_FILE undefined, ancestry.js file not included?");

var ancestry = JSON.parse(ANCESTRY_FILE);

console.log(ancestry.length);
