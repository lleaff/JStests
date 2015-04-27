var testArr = [ 9, 8, 7, 6, 5, 4 ];

Object.prototype.basicForEach =  function(fn) {
	if (!this.hasOwnProperty('0')) throw new Error(this.toString + "is not an array");

	for (var i = 0; i < this.length; ++i) {
		fn(this[i]);
	}
};

testArr.basicForEach(function(a) { console.log(a + 1); });


Object.prototype.advForEach = function(fn, arrValPos) {
	if (!this.hasOwnProperty('0')) throw new Error(this.toString + "is not an array");

	var callingObj = this;
	var args = arguments;
	var argsLength = arguments.length;

	var cfn = function(elem) {
		// Build the array of arguments
		var callArgs = [];
		for (var i = 0, offset = 0; i < argsLength - 2 - offset; ++i) {
			if ( i == arrValPos ) { callArgs[i] = elem; --offset; }
			else callArgs[i] = args[i + 2 + offset];
		}
		fn.apply(callingObj, callArgs);
	};

	this.basicForEach(cfn);
};

function print() { console.log.apply(console, arguments); }

testArr.advForEach(print, 0, "2nd arg", "3rd arg");
