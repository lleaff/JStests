var testGrid = new Grid(10, 5);
testGrid.fill("@");
console.log(testGrid.draw());

var mark = new Vector(3, 3);

testGrid.set(mark, "X");
console.log(testGrid.draw());
console.log(testGrid.get(mark));
