function World(plan) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);
	this.grid = grid;
}

World.prototype.toString = function() {
	return this.grid.toString();
};
