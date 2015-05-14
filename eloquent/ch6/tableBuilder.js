function rowHeights(rows) {
	return rows.map(function(row) {
		return row.reduce(function(max, cell) {
			return Math.max(max, cell.minHeight());
		}, 0);
	});
}

function colWidths(rows) {
	return rows[0].map(function(_cell, i) {
		return rows.reduce(function(max, row) {
			return Math.max(max, row[i].minWidth());
		});
	});
}

function Cell() {
}

Cell.prototype.minHeight = function() {
	var str = this.value.toString();
	var newline = 0;
	for(var i = 0; i < str.length - 1; ++i)
		if (str[i] === "\n") ++newline;
	return newline + 1;
};
Cell.prototype.minWidth = function() {
	return this.value.toString().length;
};


