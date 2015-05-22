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
