function World(plan, legend) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);
	this.grid = World.charGridToElemGrid(grid, legend);

	this.legend = legend;
}

World.prototype.toString = function() {
	return this.grid.toString();
};

World.charToElement = function(char, legend) {
	var element = new legend[char]();
	element.originChar = char;
	return element;
};

World.elementToChar = function(element) {
	return element.originChar;
};

World.charGridToElemGrid = function(grid, legend) {
	return grid.map(function(char) {
		return World.charToElement(char, legend); });
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
