var animal = {
	name: "Richard",
	size: 5,
	talk: function yap(str) {
		console.log(str.toUpperCase() + "!!!");
	},
	introduce: function() {
		console.log(this.talk("My name is " + this.name));
	}
};

animal.talk("hello you");
animal.introduce();
