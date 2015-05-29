var Collection = function() {
	this.hi = "HI";
};
Collection.prototype = Array.prototype;

var col = new Collection();
col.push("HELLO");
console.log(col.hi, col.pop());
