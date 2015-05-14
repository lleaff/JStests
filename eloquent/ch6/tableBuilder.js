/* =Table building function
 * ------------------------------------------------------------ */

/* 'data' must be a parsed JSON array [ {}, {}, {} ] */
function buildTable(data) {
	var rows = [];
	
	rows = data.map(function(entry) {
		var result = [];
		for (var p in entry) { if (entry.hasOwnProperty(p)){ 
			result.push(new TextCell(entry[p]));
		}}
		return result;
	});

	rows.unshift((function() {
		var propNames = [];
		for (var p in data[0]) { if (data[0].hasOwnProperty(p)) {
			propNames.push(new UnderlinedTextCell(p));
		}}
		return propNames;
	})());

	return drawTable(rows);
}


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

TextCell.prototype.draw = function(width, height, alignRight) {
	if (alignRight === undefined && !isNaN(+this.text)) alignRight = true;
	var result = [];
	for (var i = 0; i < height; ++i) {
		var line = this.text[i] || "";
		var fill = Array(width + 1 - line.length).join(" ");
		result.push(alignRight ? fill + line : line + fill);
	}
	return result;
};


/* Underlined text cell */
function UnderlinedTextCell(value) {
	this.inner = new TextCell(value);
}

UnderlinedTextCell.prototype.minHeight = function() {
	return this.inner.minHeight() + 1;
};
UnderlinedTextCell.prototype.minWidth = function() {
	return this.inner.minWidth();
};

UnderlinedTextCell.prototype.draw = 
	function(width, height, underlineCharacter, alignRight) {
	if (underlineCharacter === undefined) underlineCharacter = "-";

	return this.inner.draw(width, height - 1, alignRight).concat( 
		[Array(width + 1).join(underlineCharacter)]);
};
