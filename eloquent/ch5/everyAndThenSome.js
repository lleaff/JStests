Array.prototype.customSome = function(fn)
{
	var result = false;
	this.forEach(
		function(val, i, arr){ if(fn(val, i, arr)) result = true; });
	return result;
};

Array.prototype.customEvery = function(fn)
{
	var result = true;
	this.forEach(
		function(val, i, arr) { if(!fn(val, i, arr)) result = false; });
	return result;
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
			every: false, some: false },
		{ arr: [1, 2, "3", "4", 5 ],
			test: function(val, i, arr){ 
				return (i === 0) ? true : arr[i - 1] == (val>>0) - 1; },
			every: true, some: true } ];

		tests.forEach(function(obj, i, arr){
			console.log("test n°"+(i+1));
			console.log("some:\t" + 
				(obj.arr.customSome(obj.test) === obj.some ?
				"success" : "FAIL"));
			console.log("every:\t" + 
				(obj.arr.customEvery(obj.test) === obj.every ?
				"success": "FAIL"));
	});
}();
