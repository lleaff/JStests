if (Array.prototype.average === undefined)
	throw new Error("No array.average(), include average.js before this.");

/* Find the <script src="ancestry.js"> node created in average.js */
var ancestryScript = Array.filter(
	document.getElementsByTagName("script"), 
	function(a){ return a.getAttribute("src") === "ancestry.js"; })[0];

/* Override its onload function */
ancestryScript.onload = workOnAncestry;

Array.prototype.groupBy = function(fn)
{
	var map = {};
	this.forEach(function(a) {
		var group = fn(a);
		if (map[group] === undefined) map[group] = [];
		map[group].push(a);
	});
	return map;
};

Object.prototype.forEach = function(fn)
{
	if (typeof fn === "function")
		for (var a in this) 
			if (this.hasOwnProperty(a))
				fn(this[a], ""+a, this);
};

function workOnAncestry() 
{
	var ancestry = JSON.parse(ANCESTRY_FILE);

	function getAge(person) { return person.died - person.born; }

	function century(person) { return Math.ceil(person.died / 100); }

	function lifeExpectancy(arr) {
		return arr.map(getAge).filter(
			function(a){ return (typeof a === "number" && !isNaN(a)); }
		).average()>>0; 
	}

	console.log("Overall life expectancy:\n\t" + 
				(lifeExpectancy(ancestry)>>0) );

	var lifeExpectancyByCentury = ancestry.groupBy(century);
	lifeExpectancyByCentury.forEach(
		function(val, prop, obj) {
			obj[prop] = lifeExpectancy(val);
		}
	);

	console.log("Life expectancy by century:");
	lifeExpectancyByCentury.forEach(function(val, prop, obj) {
		console.log(prop + ": " + val);
	});
}

console.log("---lifeExpectancy.js:\tSynchronous execution done---");
