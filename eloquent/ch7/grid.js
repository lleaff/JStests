function Grid(width, height) {
	this.width = width; this.height = height;

	/* Create 2D array */
	this.arr = new Array(height);
	arr.forEach(function(a, i, arr) { arr[i] = new Array(width); });
}

Grid.prototype.draw = function() { return this.arr.join("\n"); };
