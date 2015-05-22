function World(plan, legend) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);
	this.grid = World.charGridToElemGrid(grid, legend);

	this.legend = legend;
	this.actions = new World.Actions(this);
}

/* =Helper functions
 * ------------------------------------------------------------ */
World.charToElements = function(char, legend) {
	var elements = legend[char].map(function(elemConstructor) {
		return new elemConstructor(); });
	return elements;
};
World.charGridToElemGrid = function(grid, legend) {
	return grid.map(function(char) {
		return World.charToElements(char, legend); });
};

World.elementToChar = function(element) {
	return element.ch;
};
World.elemGridToCharGrid = function(grid) {
	return grid.map(function(elements) {
		return elements.reduce(function(a, elem) {
			return (elem.solid) ? elem : a; },
			elements[0]).ch;
	});
};

World.prototype.draw = function() {
	return World.elemGridToCharGrid(this.grid).toString();
};
World.prototype.toString = World.prototype.draw;

/* =World logic
 * ------------------------------------------------------------ */
World.prototype.turn = function() {
	var actors = [];
	this.grid.forEach(function(elem) {
		if (elem.act) this.actions.actors.push(elem); });

	this.actions.apply(actions);
};

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

World.Actions = function(self) {
	this.actors = [];

	this.move = function(direction, distance) {
		var moveVec = !distance ? World.direction[direction] :
			World.direction[direction]
			.times(new Vector(distance, distance));

	};

};
