function Grid(width, height) {
	this.width = width; this.height = height;

	/* Create 2D array */
	this.arr = new Array(height);

	for (var i = 0; i < this.arr.length; ++i)
		this.arr[i] = new Array(width);
}

Grid.prototype.draw = function() { return this.arr.join("\n"); };

/* Usage: grid.forEach(function(val, col, row) {...}) */
Grid.prototype.forEach = function(fn) {
	for (var i = 0, j; i < this.arr.length; ++i)
		for (j = 0; j < this.arr[i].length; ++j)
			fn(this.arr[i][j], j, this.arr[i]);
};

Grid.prototype.fill = function(val) {
	this.forEach(function(_, col, row) { row[col] = val; });
};

Grid.prototype.get = function(vector) {
	return this.arr[vector.y][vector.x];
};

Grid.prototype.set = function(vector, value) {
	this.arr[vector.y][vector.x] = value;
};

Grid.prototype.isOutside = function(vector) {
	var xIn = false, yIn = false;
	if (this.width >= vector.x && 0 >= vector.x)
		xIn = true;
	if (this.height >= vector.y && 0 <= vector.y)
		yIn = true;

	if (xIn && yIn) {
		return true;
	} else {
		/* Return difference vector */
		return new Vector(
			xIn ? 0 : vector.x - this.width,
			yIn ? 0 : vector.y - this.height );
	}
};
