function Vector(x, y) { this.x = +x; this.y = +y; }

Vector.prototype.add = function(vec) {
	return new Vector(this.x + vec.x, this.y + vec.y); };

Vector.prototype.substract = function(vec) {
	return new Vector(this.x - vec.x, this.y - vec.y); };

Vector.prototype.move = function(x, y) { this.x += x; this.y += y; };
