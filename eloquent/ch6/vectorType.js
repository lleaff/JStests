function Vector(x, y) {
	this.x = x; this.y = y;
}

Object.defineProperty(Vector.prototype, "length", {
	get: function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
});

Vector.prototype.plus = function(toAdd) {
	if (typeof toAdd === "number") {
		this.x += toAdd; this.y += toAdd;
		return this;
	} else {
		return new Vector(this.x + toAdd.x, this.y + toAdd.y);
	}
};

Vector.prototype.minus = function(toSubstract) {
	if (typeof toAdd === "number") {
		this.x -= toAdd; this.y -= toAdd;
		return this;
	} else {
		return new Vector(this.x - toSubstract.x, this.y - toSubstract.y);
	}
};

var testVec1 = new Vector(1, 1);

console.log(testVec1.length);
