var print = function () { console.log.apply(console, arguments); };
print("hoho", "haha:))");

function hey(str)
{
	var thisName = this.toString();
	console.log((str === undefined ? "It's " : str + " it's ") +
				thisName + "!");
	this.proppp = "ho";
}

print("proppp: " + this.proppp);


var obj = {
	ho: function(str) {
		hey("ho");
	},

	prop: 5,

	prot: function() {
		console.log("iprop: " + this.prop);
		console.log("prot this = " + this.toString());
	}
};

obj.ho("obj");
obj.prot();
console.log("eprop: " + this.prop);

print("proppp: " + this.proppp);

(function po() {
	hey("po");
})();

(function pa(str) {
	var thisName = this.toString();
	console.log((str === undefined ? "It's " : str + " it's ") +
				thisName + "!");
})("pa");

function big() {
	this.pra = "aii";
	this.small = function(str) {
		var thisName = this.toString();
		console.log((str === undefined ? "It's " : str + " it's ") +
					this.toString() + "!");

		this.proppp = "heh";
	};
	small();
}

big();

var BIG = new big();

BIG.small("BIG");

print("proppp: " + this.proppp);
