World.prototype.turn = function() {
	var actors = [];
	this.grid.forEach(function(elem) {
		if (elem.act) actors.push(elem);
	});

	var actions = actors.map(function(elem) {
		return elem.act();
	});

	World.actions.apply();
};

World.direction = new (function() { /* jshint ignore:line */
	this.n	= new Vector( 0,  1); this.up		= this.n;
	this.ne	= new Vector( 1,  1);
	this.e	= new Vector( 1,  0); this.right	= this.e;
	this.se	= new Vector( 1, -1);
	this.s	= new Vector( 0, -1); this.bottom	= this.s;
	this.sw	= new Vector(-1, -1);
	this.w	= new Vector(-1,  0); this.left		= this.w;
	this.nw	= new Vector(-1,  1);
})();

World.view = function(world, position){ /* jshint ignore:line */
	this.position = position;

	this.look = function(critter, direction) {
		var image = "";
		var position = this.position;
		for (var distance = 0; distance < critter.sight;
			 ++distance) {
				 image += world.grid.get(position.plus(direction));
			 }
			 return image;
	};

};
/* World.prototype.newView = function(position) {
	return new World.view(this, position);
}; */

World.Actions = function(self) {
	return {
		move: function() {

		},
	};
};
