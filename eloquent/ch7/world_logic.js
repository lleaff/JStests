/* =Turn logic
 * ----------------------------------------------------------- */
World.prototype.turn = function() {
	var self = this;
	var actors = [];
	this.grid.forEach(function(elements, col, row, grid) {
		elements.forEach(function(element) {
		if (element.act)
			actors.push({elem: element, position: new Vector(col, row)});
	}); });
	/* Shuffle actors so conflict resolutions aren't predictable */
	shuffleArray(actors);
	actors.forEach(function(elemPos) {
		elemPos.elem.view = new World.View(
			self, elemPos.elem, elemPos.position);
		elemPos.elem.act(self);
	});
};

/* =Spatial directions
 * ------------------------------------------------------------ */
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

World.direction.random = function() {
	var x, y, vec;
	while (!x && !y) {
		x = randomInt(-1, 1); 
		y = randomInt(-1, 1);
	}
	return new Vector(x, y);
};

World.direction.forEach = function(callback) {
	var self = this;
	[ "n", "ne", "e", "se", "s", "sw", "w", "nw" ].forEach(
		function(str) { callback(self[str], str, self); });
};

World.direction.some = function(callback) {
	var self = this;
	return [ "n", "ne", "e", "se", "s", "sw", "w", "nw" ].some(
		function(str) { return callback(self[str], str, self); });
};

/* =World perception
 * ------------------------------------------------------------ */
World.View = function(world, actor, position) {
	this.world = world;
	this.actor = actor;
	this.position = position;
};

World.View.prototype.look = function(direction) {
	var image = []; /* Array of elements */
	var position = this.position;
	for (var distance = 0, element; distance < this.actor.sight;
		 ++distance) {
		elements = this.world.grid.get(position.plus(direction));
		image.push(elements);
		if (!elements ||
			elements.some(function(el) { return el.blockSight; }))
			break;
	}
	return image ? new World.View.Image(image) : null;
};

World.View.prototype.isTrapped = function() {
	var self = this;
	var exit = 0;
	return !World.direction.some(function(dir) {
		var cell = self.world.grid.get(self.position.plus(dir));
		return (cell && !cell.some(function(el) { 
			return el.solid; })) || false;
	});
};

World.View.Image = function(image) {
	this.image = image;
};

World.View.Image.prototype.isSolid = function(index) {
	function solidTest(elements) {
		return elements.some(function(el) {
			return !!el.solid; });
	}
	if (index === undefined) {
		for (var i = 0; i < this.image.length; ++i)
			if (solidTest(this.image[i])) return true;
	} else {
		if (solidTest(this.image[index])) return true;
	}
	return false;
};

World.View.Image.prototype.canReach = function(elementType) {
	var count = 0;
	for (var i = 0; i < this.image.length; ++i) {
		if (this.image[i].type === elementType)
			++count;
		else if (this.isSolid(i))
			break;
	}
	return count; /* Number of reachable elements */
};

World.View.Image.prototype.canMove = function() {
	var count = 0;
	for (var i = 0; i < this.image.length; ++i) {
		if (this.isSolid(i)) break;
		else ++count;
	}
	return count; /* Maximum possible move distance */
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
			var moveVec = new Vector(0, 0);
			var image = actor.view.look(direction);
			/* Stop movement at the first obstacle */
			for (var i = 0; i < distance; ++i) {
				if (image.image && !image.isSolid(i)) {
					moveVec.add(direction);
				} else {
					break; }
			}

			if (moveVec.x === 0 && moveVec.y === 0) /* has moved? */
				return false;
			world.moveElement(actor.view.position,
							  actor.view.position.plus(moveVec), actor);

			return i; /* Times direction vector was applied */
		},
	};
};
