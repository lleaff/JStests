if (Array.prototype.average === undefined)
	throw new Error("No array.average(), include average.js before this.");

/* Find the <script src="ancestry.js"> node created in average.js */
var ancestryScript = Array.filter(
	document.getElementsByTagName("script"), 
	function(a){ return a.getAttribute("src") === "ancestry.js"; })[0];

/* Override its onload function */
ancestryScript.onload = workOnAncestry;

function workOnAncestry() 
{
	var ancestry = JSON.parse(ANCESTRY_FILE);

	function getAge(person) { return person.died - person.born; }

	function lifeExpectancy(arr) {
		return arr.map(getAge).filter(
			function(a){ return (typeof a === "number" && !isNaN(a)); }
		).average(); 
	}

	console.log("Overall life expectancy:\n\t" + 
				(lifeExpectancy(ancestry)>>0) );
}

console.log("---lifeExpectancy.js:\tSynchronous execution done---");
