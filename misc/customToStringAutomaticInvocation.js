function Flower(type) {
	this.type = type;
}

Flower.prototype.toString = (function() { 
	schemes = {
		tulip:	[
			"( //)",
			" (/)",
			"  |",
			"  | ",
			" \\|/"
			].join("\n"),
		margerite: [
			" .o.",
			"o * o",
			" °o°",
			"  |",
			"  |"
			].join("\n")
	};

	return function() { return "\n"+schemes[this.type]+"\n"; };

})();

var tulip = new Flower("tulip");
console.log(tulip+"Tulip");

var margerite = new Flower("margerite");
console.log(margerite+"Margerite");
