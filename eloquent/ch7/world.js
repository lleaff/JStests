function World(plan, legend) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);
	this.grid = World.charGridToElemGrid(grid, legend);

	this.legend = legend;
}

/* =Helper functions
 * ------------------------------------------------------------ */
World.charToElement = function(char, legend) {
	var element = new legend[char]();
	element.originChar = char;
	return element;
};
World.charGridToElemGrid = function(grid, legend) {
	return grid.map(function(char) {
		return World.charToElement(char, legend); });
};

World.elementToChar = function(element) {
	return element.originChar;
};
World.elemGridToCharGrid = function(grid) {
	return grid.map(function(elem) {
		return elem.originChar;
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
		if (elem.act) actors.push(elem);
	});

	var actions = actors.map(function(elem) {
		return elem.act();
	});

	World.actions.apply();
};
