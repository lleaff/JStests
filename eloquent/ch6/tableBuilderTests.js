var testData = [
	[ 
		["Name\n---", "Sex\n---", "Age\n---"],
		["Samanta", "f", "33"],
		["Richard", "m", "55"],
		["Paul", "m", "2"],
		["Jiggly\nPuff", "Unknown", "Unknown"]
	]
];

testData.forEach(function(val, i) {
	console.log("Data set n°"+(i+1)+":");

	var rowsOfCells = val.map(function(row) {
		return row.map(function(value) {
			return new TextCell(value);
		});
	});
	console.log(drawTable(rowsOfCells));
});
