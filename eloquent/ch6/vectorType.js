function Vector(x, y) {
	this.x = x; this.y = y;
}

Vector.prototype.toString = function() {
	return "{"+this.x+", "+this.y+"}";
};

Object.defineProperty(Vector.prototype, "length", {
	get: function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
});

Vector.prototype._operate = function(operation, target) {
	if (typeof target === "number") {
		return new Vector(
			operation(this.x, target),
			operation(this.y, (typeof arguments[2] === undefined) ? 
						  target : +arguments[2]));
	} else {
		return new Vector(
			operation(this.x, target.x),
			operation(this.y, target.y));
	}
};

Vector.prototype.plus = function(toAdd) {
	return this._operate(function(a, b){ return a+b; }, toAdd);
};

Vector.prototype.minus = function(toSubstract) {
	return this._operate(function(a, b){ return a-b; }, toSubstract);
};

var testVec1 = new Vector(1, 1);

console.log(testVec1.length);
