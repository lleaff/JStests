if (Array.prototype.average === undefined)
	throw new Error("No array.average(), include average.js before this.");

/* Find the <script src="ancestry.js"> node created in average.js */
var ancestryScript = Array.filter(
	document.getElementsByTagName("script"), 
	function(a){ return a.getAttribute("src") === "ancestry.js"; })[0];

/* Override it's onload function */
ancestryScript.onload = workOnAncestry;

function workOnAncestry() 
{
	console.log("hi");
}

console.log("---lifeExpectancy.js:\tSynchronous execution done---");
