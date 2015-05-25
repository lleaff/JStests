/* =Spatial directions
 * ------------------------------------------------------------ */
World.direction = new (function() { /* jshint ignore:line */
	this.n	= new Vector( 0,  1); this.up		= this.n;
	this.ne	= new Vector( 1,  1);
	this.e	= new Vector( 1,  0); this.right	= this.e;
	this.se	= new Vector( 1, -1);
	this.s	= new Vector( 0, -1); this.bottom	= this.s;
	this.sw	= new Vector(-1, -1);
	this.w	= new Vector(-1,  0); this.left		= this.w;
	this.nw	= new Vector(-1,  1);
})();
World.directions = [ "n", "ne", "e", "se", "s", "sw", "w", "nw" ];
World.directions.vectors = [ new Vector(0, 1), new Vector(1, 1),
	 new Vector(1, 0), new Vector(1, -1), new Vector(0, -1),
	 new Vector(-1, -1), new Vector(-1, 0), new Vector(-1, 1) ];

World.direction.vectorToDirection = function(vector) {
	for (var i = 0; i < World.directions.vectors.length; ++i)
		if (World.directions.vectors[i].equal(vector))
			return World.directions[i];
};

World.direction.random = function() {
	var x, y, vec;
	while (!x && !y) {
		x = randomInt(-1, 1); 
		y = randomInt(-1, 1);
	}
	return new Vector(x, y);
};

World.direction.forEach = function(callback) {
	var self = this;
	World.directions.forEach(
		function(str) { callback(self[str], str, self); });
};

World.direction.forEachFrom = function(callback, initialDirection) {
	var up, lo;
	var currentUp, currentLo;

	function incrementUp() {
		currentUp = currentUp < World.directions.length ?
			currentUp + 1 : 0; }
	function incrementLo() {
		currentLo = currentLo > 0 ?
			currentLo - 1 : World.directions.length; }
	


};

World.direction.some = function(callback) {
	var self = this;
	return World.directions.some(
		function(str) { return callback(self[str], str, self); });
};

