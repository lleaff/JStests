/* =Turn logic
 * ------------------------------------------------------------ */
World.prototype.turn = function() {
	var actors = [];
	this.grid.forEach(function(element, col, row, grid) {
		if (element.act)
			actors.push({elem: element, position: new Vector(col, row)});
	});
	/* Shuffle actors so conflict resolutions aren't predictable */
	shuffleArray(actors);
	actors.forEach(function(elemPos) {
		elemPos.elem.view = new World.View(this, elemPos.position);
		elemPos.elem.act();
	});
};

/* ------------------------------------------------------------ */
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

/* =World perception
 * ------------------------------------------------------------ */
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

World.View.Image = function(image) {
	this.image = image;
};

World.View.Image.prototype.canReach = function(elementType) {
	var count = 0;
	for (var i = 0; i < this.image.length; ++i) {
		if (this.image[i].type === elementType)
			++count;
		else if (this.image[i].solid)
			break;
	}
	return count; /* Number of reachable elements */
};

World.View.Image.prototype.canSee = function(elementType) {
	var count = 0;
	for (var i = 0; i < this.image.length; ++i) {
		if (this.image[i].type === elementType)
			++count;
	}
	return count; /* Number of elements in sight */
};

/* =Actions
 * ------------------------------------------------------------ */

World.Actions = function(world) {
	return {
		/* The actor's current View is stored in its .view property */

		move: function(actor, direction, distance) {
			if (distance === undefined) distance = actor.speed;
			var moveVec = new vector(0, 0);
			for (var i = 0; i < distance; ++i) {
				if (!actor.view.Image.image[i].solid) {
					moveVec.add(direction);
				} else {
					break; }
			}

			if (moveVec.x === 0 && moveVec.y === 0) /* has moved? */
				return false;

			/* Push actor in new position */
			var newPos = actor.position.plus(moveVec);
			world.grid.set(newPos, world.grid.get(newPos.push(actor)));
			/* Remove actor from old position */
			var oldPosElems = world.grid.get(actor.position);
			world.grid.set(actor.position,
					   oldPosElems.splice(indexOf(actor), 1));

			return moveVec;
		},
	};
};
