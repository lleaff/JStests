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

/* View object */
World.View = function(world, position){ /* jshint ignore:line */
	this.world = world; /* self */
	this.position = position;
};

World.View.prototype.look = function(critter, direction) {
	var image = []; /* Array of elements */
	var position = this.position;
	for (var distance = 0, element; distance < critter.sight;
		 ++distance) {
			element = this.world.grid.get(position.plus(direction));
			image.push(element);
			if (element.blockSight) break;
		 }
		 return new Image(image);
};

/* World.prototype.newView = function(position) {
   return new World.view(this, position);
}; */

World.Image = function(image) {
	this.image = image;
};

World.Image.prototype.canReach = function(elementType) {
	for (var i = 0; i < this.image.length; ++i) {
		if (this.image[i].type === elementType)
			return i + 1; /* distance to element */
		else if (this.image[i].solid)
			return 0; /* false */
	}
};

World.Image.prototype.canSee = function(elementType) {
	var count = 0;
	for (var i = 0; i < this.image.length; ++i) {
		if (this.image[i].type === elementType)
			++count;
	}
	return count; /* Number of elements in sight */
};


World.Actions = function(self) {
	return {
		move: function() {

		},
	};
};
