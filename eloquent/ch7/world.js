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
	var elements = legend[char].map(function(element) {
		var instance = Object.create(element);
		instance.prototype = element;
		return instance;
	});
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

/* Build a map of characters->elementPrototypes from a map of
 *  elementName->elementPrototypes */
World.charMapFromElemMap = function(elements) {
	var legend = {};
	for (var element in elements) {
		var elem = elements[element];
		if (!elem.ch) continue; /* skip bogus properties */
		legend[elem.ch] = [ elements[element] ];
		/* If the element can move, put default element under it */
		if (elem.speed) legend[elem.ch].push(elements.default);
	}
	return legend;
};
