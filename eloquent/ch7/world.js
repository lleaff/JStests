function World(plan, legend) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);
	this.grid = World.charGridToElemGrid(grid, legend);

	this.legend = legend;
	this.actions = new World.Actions(this);
}

/* =Helper functions
 * ------------------------------------------------------------ */
World.charToElements = function(char, legend) {
	var elements = new legend[char]();
	if (Array.isArray(elements)) {
		elements.forEach(function(_, i, elements) {
			elements[i].originChar = char;
		});
	} else {
		elements.originChar = char;
		elements = [ elements ];
	}
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

World.directions = {
	"n":	0,	"up":		0,
	"ne": 	3,
	"e":	6,	"right":	6,
	"se":	9,
	"s":	12,	"bottom":	12,
	"sw":	15,
	"w":	18,	"left":		18,
	"nw":	21
};

World.prototype.actions = {

};
