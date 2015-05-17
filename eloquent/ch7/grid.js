function Grid(width, height) {
	this.width = width; this.height = height;

	/* Create 2D array */
	this.arr = Array(height).map(function() { Array(width); });
}

Grid.prototype.draw = function() { return this.arr.join("\n"); };

/* Usage: grid.forEach(function(val, col, row) {...}) */
Grid.prototype.forEach = function(fn) {
	for (var i = 0, j; i < this.arr.length; ++i)
		for (j = 0; j < this.arr[i].length; ++j)
			fn(this.arr[i][j], j, arr[i]);
};

Grid.prototype.fill = function(val) {
	this.forEach(function(_, col, row) { row[col] = val; });
};
