var testData = [
	[ 
		["Name", "Sex", "Age"],
		["Samanta", "f", "33"],
		["Richard", "m", "55"],
		["Paul", "m", "2"],
		["Jiggly\nPuff", "Unknown", "Unknown"]
	]
];

testData.forEach(function(val, i) {
	console.log("Data set n°"+(i+1)+":");

	var rowsOfCells = val.map(function(row, index) {
		return row.map(function(value) {
			return (index) ? (new TextCell(value)) : (new UnderlinedTextCell(value));
		});
	});
	console.log(drawTable(rowsOfCells));
});

/* =Mountain test
 * ------------------------------------------------------------ */

function includeScript(src, callback, appendTo) {
	if (appendTo === undefined)
		appendTo = document.body || document.head;

	var script = document.createElement("script");
	script.setAttribute("src", src);
	if (callback) script.onload = callback;
	appendTo.appendChild(script);
	return script;
}

includeScript("http://eloquentjavascript.net/code/mountains.js",
			 mountainTest);

function mountainTest() {
	console.log("Mountains data set:");
	console.log(buildTable(MOUNTAINS));
}
