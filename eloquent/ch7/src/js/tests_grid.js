var testGrid = new Grid(10, 5);
testGrid.fill("@");
console.log(testGrid.draw());

var mark = new Vector(3, 3);

testGrid.set(mark, "X");
console.log(testGrid.draw());
console.log(mark+": "+testGrid.get(mark));

console.log("is "+mark+" inside the grid? "+
			(!testGrid.isOutside(mark) ? "yes" : "no"));

var newGrid = testGrid.map(function(val) {
	return val === "@" ? "X" : "@"; });
console.log(""+newGrid);
console.log(""+testGrid);
