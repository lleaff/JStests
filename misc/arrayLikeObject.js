var Collection = function() {
	this.hi = "HI";
};
Collection.prototype = Object.create(Array.prototype);

var col = new Collection();
col.push("HELLO");
console.log(col.hi, col.pop());

Collection.prototype.testProp = "TEST";
console.log(col.testProp, [].testProp);
