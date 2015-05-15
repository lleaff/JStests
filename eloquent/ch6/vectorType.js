function Vector(x, y) {
	this.x = x; this.y = y;
}

Object.defineProperty(Vector.prototype, "length", {
	get: function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
});

var testVec1 = new Vector(1, 1);

console.log(testVec1.length);
