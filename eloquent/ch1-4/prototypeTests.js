var animal = {
	say: function(str) {
		console.log(str + 
					(this.species !== undefined ? (" i'm a " + this.species) : ""));
	}
};



var rabbit = Object.create(animal);
rabbit.species = "rabbit";

rabbit.say("hi!!");



var mouse = {
	species: "mouse"
};
Object.setPrototypeOf(mouse, animal);

mouse.say("hullo :>");
