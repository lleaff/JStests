function average(arr)
{
	function add(a, b) { return a + b; }
	return arr.reduce(add) / arr.length;
}

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

var jsFile = "/home/elo/SoftwareDev/JStests/eloquent/ch5/ancestry.js";
function loadJsFile(jsFile, callback){
	if (typeof(jsFile) !== "string") throw new Error("jsFile must be a string");

	/* Create the node */
	var script = document.createElement("script");
	script.setAttribute("src", jsFile);
	/* Append it to <head> */
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(script);

	if (script === undefined) throw new Error("script undefined"); //DEBUG
	console.log("script: " + script);
	var n = 0;//DEBUG
	if (callback === undefined) { 	/* Synchronous */
		loadJsFile.ready = false;
		script.onload = function() { loadJsFile.ready = true; };
		//while (loadJsFile.ready === false) {}
		//if (script === undefined) throw new Error("script undefined"); //DEBUG
		///* Wait until the script is loaded before returning */
		//while (script.readyState != "complete") {
		//	console.log(n++);//DEBUG
		//	if (script === undefined) throw new Error("script undefined"); //DEBUG
		//}
	} else { 						/* Asynchronous */
		script.onload = callback;
	}
}

//loadJsFile("ancestry.js", function() { console.log(JSON.parse(ANCESTRY_FILE)); });
loadJsFile("ancestry.js");
console.log("done");
