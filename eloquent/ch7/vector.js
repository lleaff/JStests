function Vector(x, y) { this.x = +x; this.y = +y; }

Vector.prototype.plus = function(vec) {
	return new Vector(this.x + vec.x, this.y + vec.y); };

Vector.prototype.minus = function(vec) {
	return new Vector(this.x - vec.x, this.y - vec.y); };

Vector.prototype.times = function(vec) {
	return new Vector(this.x * vec.x, this.y * vec.y); };

Vector.prototype.add = function(x, y) { this.x += x; this.y += y; };

Vector.prototype.substract = function(x, y) { this.x -= x; this.y -= y; };

Vector.prototype.multiply = function(x, y) { this.x *= x; this.y *= y; };

Vector.prototype.toString = function() {
	return "{"+this.x+", "+this.y+"}";
};
