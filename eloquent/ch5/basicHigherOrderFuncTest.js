Object.prototype.basicForEach =  function(fn) {
	if (!this.hasOwnProperty('0')) throw new Error(this.toString + "is not an array");

	for (var i = 0; i < this.length; ++i) {
		fn(this[i]);
	}
};

var testArr = [ 9, 8, 7, 6, 5, 4 ];

testArr.basicForEach(function(a) { console.log(a + 1); });
