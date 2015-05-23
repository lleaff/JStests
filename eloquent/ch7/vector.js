function Vector(x, y) { this.x = +x; this.y = +y; }

/* =Return new vector
 * ------------------------------------------------------------ */
Vector.prototype.plus = function(vec) {
	return new Vector(this.x + vec.x, this.y + vec.y); };

Vector.prototype.minus = function(vec) {
	return new Vector(this.x - vec.x, this.y - vec.y); };

Vector.prototype.times = function(vec) {
	return new Vector(this.x * vec.x, this.y * vec.y); };

/* =Modify given vector
 * ------------------------------------------------------------ */
Vector.prototype.add = function(vec) {
	this.x += vec.x; this.y += vec.y; };

Vector.prototype.substract = function(vec) {
	this.x -= vec.x; this.y -= vec.y; };

Vector.prototype.multiply = function(vec) {
	this.x *= vec.x; this.y *= vec.y; };

/* =toString interface
 * ------------------------------------------------------------ */
Vector.prototype.toString = function() {
	return "{"+this.x+", "+this.y+"}";
};
