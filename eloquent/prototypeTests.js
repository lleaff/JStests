var animal = {
	say: function(str) {
		console.log(str);
	}
};

var squirrel = Object.create(animal);
squirrel.type = squirrel;

squirrel.say("hey");
