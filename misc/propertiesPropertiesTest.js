var objA = { almostEmpty: "Almost empty" };
Object.defineProperty(objA, "propA", { 
	get: function() { return propA+"A"; },
	set: function(val) { propA = ""+val+">"; }});

objA.propA = "yo";
console.log(objA.propA);
