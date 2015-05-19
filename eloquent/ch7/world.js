function World(plan) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);
	this.grid = grid;

}

var testPlan = [
	"############",
	"#          #",
	"#  ##   o  #",
	"#    #     #",
	"#  o       #",
	"#        o #",
	"############"].join("\n");
var testWorld1 = new World(testPlan);

console.log(""+testWorld1.grid);
