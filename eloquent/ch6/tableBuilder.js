/* =Draw functions
 * ------------------------------------------------------------ */

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
		}, 0);
	});
}

function drawTable(rows, collSeparator) {
	if (collSeparator === undefined) collSeparator = " ";

	var widths	= colWidths(rows);
	var heights	= rowHeights(rows);

	function drawLine(blocks, lineNum) {
		return blocks.map(function(block) {
			return block[lineNum];
		}).join(collSeparator);
	}

	function drawRow(row, rowNum) {
		var blocks = row.map(function(cell, collNum) {
			return cell.draw(widths[collNum], heights[rowNum]);
		});
		return blocks[0].map(function(_block, lineNum) {
			return drawLine(blocks, lineNum);
		}).join("\n");
	}

	return rows.map(drawRow).join("\n");
}

/* =Cell objects
 * ------------------------------------------------------------ */

/* Regular text cell */
function TextCell(value) {
	if (value !== undefined) {
		if (typeof value !== "string") value = value.toString();
		this.text = value.split("\n");
	}
}

TextCell.prototype.minHeight = function() {
	return this.text.length;
};
TextCell.prototype.minWidth = function() {
	return this.text.reduce(function(max, line) {
		return Math.max(max, line.length);
	}, 0);
};

TextCell.prototype._DrawCell = 
	function(stringArray, width, height, alignRight) {
	var result = [];
	for (var i = 0; i < height; ++i) {
		var line = stringArray[i] || "";
		var fill = Array(width + 1 - line.length).join(" ");
		result.push(alignRight ? fill + line : line + fill);
	}
	return result;
};

TextCell.prototype.draw = function(width, height, alignRight) {
	if (alignRight !== undefined && !isNaN(+this.text)) alignRight = true;
	return this._DrawCell(this.text, width, height, alignRight);
};


/* Underlined text cell */
function UnderlinedTextCell(value) {
	TextCell.call(this, value); /* Inherit from TextCell */
}

UnderlinedTextCell.prototype = new TextCell();

UnderlinedTextCell.prototype.draw = 
	function(width, height, underlineCharacter, alignRight) {
	if (underlineCharacter === undefined) underlineCharacter = "-";

};
