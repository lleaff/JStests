function Grid(width, height) {
	this.width = width; this.height = height;

	/* Create 2D array */
	this.arr = new Array(height);
	for (var i = 0; i < this.arr.length; ++i)
		this.arr[i] = new Array(width);
}

Grid.prototype.draw = function() { return this.arr.join("\n"); };
Grid.prototype.toString = Grid.prototype.draw;

/* Usage: grid.forEach(function(val, col, row, arr) {...}) */
Grid.prototype.forEach = function(fn, thisArg) {
	if (thisArg === undefined) thisArg = this;

	for (var i = 0, j; i < thisArg.arr.length; ++i)
		for (j = 0; j < thisArg.arr[i].length; ++j)
			fn(thisArg.arr[i][j], j, i, thisArg.arr);
};

Grid.prototype.map = function(fn) {
	var newGrid = new Grid(this.width, this.height);
	this.forEach(function(val, col, row, arr) {
		newGrid.arr[row][col] = fn(val, col, row, arr); });
	return newGrid;
};

Grid.prototype.fill = function(val) {
	this.forEach(function(_, col, row, arr) { arr[row][col] = val; });
};

Grid.prototype.get = function(vector) {
	return this.arr[vector.y][vector.x];
};

Grid.prototype.set = function(vector, value) {
	this.arr[vector.y][vector.x] = value;
};

Grid.prototype.isOutside = function(vector) {
	var xIn = false, yIn = false;
	if (this.width >= vector.x && 0 <= vector.x)
		xIn = true;
	if (this.height >= vector.y && 0 <= vector.y)
		yIn = true;

	if (xIn && yIn) {
		return false;
	} else {
		/* Return difference vector */
		return new Vector(
			xIn ? 0 : vector.x - this.width,
			yIn ? 0 : vector.y - this.height );
	}
};

Grid.parse = function(rectangularString) {
	/* Get width and height first */
	var width, height = 0;
	for (var i = 0; i < rectangularString.length; ++i) {
		if (rectangularString[i] === "\n") {
			if (width === undefined)
				width = i;
			++height;
		}
	}
	/* Handle absence of trailing newline char */
	if (rectangularString[rectangularString.length -1] !== "\n")
		++height;

	var grid = new Grid(width, height);

	/* Fill in the grid */
	var offset = 0;
	for (i = 0; i < rectangularString.length; ++i) {
		if (rectangularString[i] === "\n") ++offset;
		else grid.set(
			new Vector((i - offset) % width, ((i - offset) / width)>>0),
			rectangularString[i]);
	}

	return grid;
};
