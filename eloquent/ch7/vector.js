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

/* =Properties
 * ------------------------------------------------------------ */
Object.defineProperty(Vector.prototype, "length", {
	get: function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
});

/* =Comparison
 * ------------------------------------------------------------ */
Vector.prototype.equal = function(vec) {
	return this.x === vec.x && this.y === vec.y; };

Vector.prototype.greater = function(vec) {
	return this.length > vec.length; };

Vector.prototype.less = function(vec) {
	return this.length < vec.length; };
