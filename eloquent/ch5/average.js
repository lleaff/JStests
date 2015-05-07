Array.prototype.average = function ()
{
	function add(a, b) { return a + b; }
	return this.reduce(add) / this.length;
};

/* =Tests
 * ------------------------------------------------------------ */
function randInt(lowerLimit, upperLimit)
{
	return Math.round(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
}

function randomIntArray(length, lowerLimit, upperLimit)
{
	/* Default values */
	if (length === undefined) length = 7;
	if (lowerLimit === undefined) lowerLimit = 0;
	if (upperLimit === undefined) {
		if (lowerLimit === undefined) upperLimit = 10;
		else upperLimit = (lowerLimit || 1) * 10;
	}

	var arr = [];
	(function fill(length, lowerLimit, upperLimit) {
		if (length) arr.push(fill(--length, lowerLimit, upperLimit));
		return randInt(lowerLimit, upperLimit);
	})(length, lowerLimit, upperLimit);
	return arr;
}

Array.prototype.print = function() {
	var str = "";
	for (var i = 0; i < this.length; ++i)
		str += this[i] + ((i == this.length - 1) ? "" : ", ");
		console.log(str);
};

/* Execution */
function test() {
	console.log("Deviation: " + (function test(testC) {
		var expectedAverage = 5;
		var range = [0, 10];
		var averages = [];
		for (testArr = []; testC > 0; --testC) {
			testArr = randomIntArray(10, range[0], range[1]);
			averages.push(average(testArr));
		}
		return Math.abs(average(averages) - expectedAverage);
	})(100000));
}

/* =Application on ancestry data
 * ------------------------------------------------------------ */

/* Load ancestry.js */
var jsFile = "/home/elo/SoftwareDev/JStests/eloquent/ch5/ancestry.js";
function loadJsFile(jsFile, callback){
	if (typeof(jsFile) !== "string")
		throw new Error("jsFile must be a string");

	/* Create the node */
	var script = document.createElement("script");
	script.setAttribute("src", jsFile);
	/* Append it to <head> */
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(script);

	if (callback === undefined) { 	/* Synchronous */
		if (loadJsFile.loaded === undefined) 
			loadJsFile.loaded = {}; /* Holds the names of jsFiles being loaded */

		script.onload = function() { loadJsFile.loaded[jsFile] = true; };
		while( !loadJsFile.loaded[jsFile] ) {} /* Block execution */
		delete loadJsFile.loaded[jsFile]; /* Clean up now useless property */
	} else { 						/* Asynchronous */
		script.onload = callback;
	}
}

loadJsFile("ancestry.js", workOnAncestry);

/* Application */
function workOnAncestry() 
{
	var ancestry = JSON.parse(ANCESTRY_FILE); 

	function getDeathAge(person)	{ return person.died - person.born; }
	function getFemale(person)		{ return person.sex === "f"; }
	function getMale(person) 		{ return person.sex === "m"; }

	var avrAge = ancestry.map(getDeathAge).average();
	var avrAgeF = ancestry.filter(getFemale).map(getDeathAge).average();
	var avrAgeM = ancestry.filter(getMale).map(getDeathAge).average();
	console.log(["Average age of death:",
				"all:\t" + avrAge,
				"female:\t" + avrAgeF,
				"male:\t" + avrAgeM].join("\n"));

	function byName(dataArr, name) {
		return dataArr.reduce(function(a, b) { return (b.name === name) ? b : a; }, null);
	}

	console.log((byName(ancestry, "Pieter Haverbeke")));

	/* -------------------------------------------------------------------------------- */

	function byMotherName(dataArr, name) {
		return dataArr.reduce(function(a, b) { return (b.mother === name) ? b : a; }, null);
	}

	function children(dataArr, name) {
		return dataArr.filter(function(a){ return a.mother === name || a.father === name; });
	}

	function isMother(person, _, array) { return byMotherName(array, person.name); }

	var mothers = ancestry.filter(isMother);
	var mothersAndChildren = mothers.map(function(a) { return { mother: a, children: children(ancestry, a.name) }; });

	var avrAgeMCDiff = mothersAndChildren.map(function(a) { 
		return a.children.map(function(b){ return b.born - a.mother.born; }).average();
	}).average();

	console.log("Average mother-child age difference:\n\t" + avrAgeMCDiff);

}

console.log("---Synchronous execution done---");
