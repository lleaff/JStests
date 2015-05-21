function World(plan, legend) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);

	legend = World.charMapFromElemMap(legend);

	this.grid = World.charGridToElemGrid(grid, legend);
	this.legend = legend;
	this.actions = new World.Actions(this);
}

/* =Helper functions
 * ------------------------------------------------------------ */
World.charToElements = function(char, legend) {
	var elements = legend[char].map(function(elemConstructor) {
		return new elemConstructor(); });
	elements.forEach(function(_, i, elements) {
		elements[i].originChar = char;
	});
	return elements;
};
World.charGridToElemGrid = function(grid, legend) {
	return grid.map(function(char) {
		return World.charToElements(char, legend); });
};

World.elementToChar = function(element) {
	return element.originChar;
};
World.elemGridToCharGrid = function(grid) {
	return grid.map(function(elements) {
		return elements.reduce(function(a, elem) {
			return (elem.solid) ? elem : a; },
			elements[0]).originChar;
	});
};

World.prototype.draw = function() {
	return World.elemGridToCharGrid(this.grid).toString();
};
World.prototype.toString = World.prototype.draw;

/* Build a map of characters->elementConstructors from a map of
 * elementName->elementConstructors */
World.charMapFromElemMap = function(constructors) {
	var legend = {};
	for (var constructor in constructors) {
		/* Create a new element from the constructor to be able to
		 *  extract its ch property */
		var elem = new constructors[constructor]();
		legend[elem.ch] = [ constructors[constructor] ];
		/* If the element can move, put default element under it */
		if (elem.speed) legend[elem.ch].push(constructors.default);
	}
	return legend;
};

/* =World logic
 * ------------------------------------------------------------ */
World.prototype.turn = function() {
	var actors = [];
	this.grid.forEach(function(elem) {
		if (elem.act) actors.push(elem);
	});

	var actions = actors.map(function(elem) {
		return elem.act();
	});

	World.actions.apply();
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

World.prototype.actions = {

};
