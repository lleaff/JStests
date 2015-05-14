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

function drawTable(rows, colSeparator) {
	if (colSeparator === undefined) colSeparator = " ";

	var width	= rowWidths(rows);
	var height	= rowHeights(rows);

	function drawLine(blocks, lineNum) {
		return blocks.map(function(block) {
			return block[lineNum];
		}).join(colSeparator);
	}

	function drawRow(row, rowNum) {
		var blocks = row.map(function(cell, collNum) {
			cell.draw(width, height);
		});
		return blocks[0].map(function(_block, lineNum) {
			drawLine(blocks, lineNum);
		}).join("\n");
	}

	return rows.map(drawRow).join("\n");
}


function TextCell(value) {
	if (typeof value !== "string") value = value.toString();
	this.text = value.split("\n");
}

TextCell.prototype.minHeight = function() {
	return this.text.length;
};
TextCell.prototype.minWidth = function() {
	return this.text.reduce(function(max, line) {
		return Math.max(max, line.length);
	}, 0);
};

TextCell.prototype.draw = function(width, height, alignRight) {
	var result = [];
	for (var i = 0; i < height; ++i) {
		var line = this.text[i] || "";
		var fill = Array(width + 1 - line.length).join(" ");
		result.push(alignRight ? fill + line : line + fill);
	}
	return result;
};
