Array.prototype.customSome = function(fn)
{

};

Array.prototype.customEvery = function(fn)
{
};

!function testCustomEveryAndSome()
{
	var tests = [
		{ arr: [ 1, 2, 3, 4, 5 ],
			test: function(a){ return typeof a === "number"; },
			every: true, some: true },
		{ arr: [1, 2, "3", 4, 5 ],
			test: function(a){ return typeof a === "number"; },
			every: false, some: true },
		{ arr: [ "1", "2", "3", "4", "5" ],
			test: function(a){ return typeof a === "number"; },
			every: false, some: false } ];

		tests.forEach(function(obj, i){
			console.log("test n°"+(i+1));
			console.log("some:\t" + 
				(obj.arr.customSome(obj.test) === obj.some ?
				"success" : "FAIL"));
			console.log("every:\t" + 
				(obj.arr.customEvery(obj.test) === obj.every ?
				"success": "FAIL"));
	});
}();
