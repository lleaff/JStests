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

World.direction.vectorToDirectionName = function(vector) {
	for (var i = 0; i < World.directions.vectors.length; ++i)
		if (World.directions.vectors[i].equal(vector))
			return World.directions[i];
};

World.direction.vectorToDirection = function(vector) {
	return new Vector(vector.x ? 1 : 0, vector.y ? 1 : 0);
};

World.direction.vectorToDistance = function(vector) {
	return vector.x;
};

World.direction.random = function() {
	var x, y, vec;
	while (!x && !y) {
		x = randomInt(-1, 1); 
		y = randomInt(-1, 1);
	}
	return new Vector(x, y);
};

World.direction.forEach = function(callback, thisArg) {
	var self = this;
	World.directions.forEach(
		function(str) { callback(self[str], str, self); }, thisArg);
};

/* Iterate through directions by gradually going farther
 *  from 'initialDirection' */
World.direction.forEachFrom =
					function(initialDirection, callback, thisArg) {
	var initI = World.directions.indexOf(
			 World.direction.vectorToDirectionName(initialDireciton));
	var curI = initI;

	var upI, loI;
	function incrementUp() {
		return upI += upI < World.directions.length ?  1 : 0; }
	function incrementLo() {
		return loI -= loI > 0 ? 1 : World.directions.length; }

	while (upI !== initI && loI !== initI) {
		callback.call(thisArg,
				  directions.vectors[curI], directions[curI], this);
		if (curI === upI)	{ curI = incrementUp(); }
		else				{ curI = incrementLo(); }
	}
};

World.direction.some = function(callback, thisArg) {
	var self = this;
	return World.directions.some(
		function(str) {
			return callback.call(thisArg, self[str], str, self); },
			thisArg);
};

