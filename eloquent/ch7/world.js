function World(plan, legend) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);
	this.grid = grid;
	this.charGridToElemGrid();

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

World.prototype.charGridToElemGrid = function() {
	this.grid.map(function(char) {
		return World.charToElement(char, this.legend); });
};

var legend = {
	"#":  function() {
		this.type = "wall";
		this.solid = true;
	},
	" ": function() {
		this.type = "emptySpace";
		this.solid = false;
	},
	"o": function() {
		this.type = "critter";
		this.solid = true;
	}
};
