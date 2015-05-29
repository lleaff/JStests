/* =World perception
 * ------------------------------------------------------------ */
World.View = function(world, actor, position) {
	this.world = world;
	this.actor = actor;
	this.position = position;
};

/* Creates a new view by applying 'vector' to actor's '.position' */
World.View.prototype.New = function(vector) {
	return new World.View(this.world, this.actor, this.position.plus(vector));
};

World.View.prototype.isTrapped = function() {
	var exit = 0;
	return !World.direction.some(function(dir) {
		var cell = this.world.grid.get(this.position.plus(dir));
		return (cell && !cell.some(function(el) { 
			return el.solid; })) || false;
	}, this);
};

World.View.prototype.isOn = function(elementType) {
	return World.Elements.hasType(
		this.world.grid.get(this.position), elementType);
};

/* Returns vectors to positions in all directions containing element
 *  of 'elementType' */
World.View.prototype.reachable = function(elementType, distance) {
	var vectors = [];
	World.direction.forEach(function(direction) {
		vectors.concat(this.look(direction, distance || this.actor.speed)
													   .reachable(elementType));
	}, this);
	return vectors;
};

/* Returns vectors to positions in all directions containing element
 *  of 'elementType' */
World.View.prototype.visible = function(elementType) {
	var vectors = [];
	var self;
	World.direction.forEach(function(direction) {
		vectors.concat(self.look(direction).visible(elementType));
	});
	return vectors;
};

/* The 'sight' argument can be used to overide the actor's sight
 * property, to get images for use in non-sight related actions */
World.View.prototype.look = function(direction, sight) {
	var image = []; /* Array of elements */
	var nonVisual;
	if (sight === undefined) {
		sight = this.actor.sight;
		nonVisual = false;
	} else {
		nonVisual = true; }

	var position = this.position;
	for (var distance = 0, element; distance < sight;
		 ++distance) {
		elements = this.world.grid.get(position.plus(direction));
		image.push(elements);
		if (!elements || (!nonVisual &&
			elements.some(function(el) { return el.blockSight; })))
			break;
	}
	return new World.View.Image(image, direction);
};

World.View.Image = function(image, direction) {
	this.image = image;
	this.direction = direction;
};

World.View.Image.prototype.isSolid = function(index) {
	function solidTest(elements) {
		return elements.some(function(el) {
			return !!el.solid; });
	}
	if (index === undefined) { /* Test all cells in image */
		for (var i = 0; i < this.image.length; ++i)
			if (solidTest(this.image[i])) return true;
	} else {
		if (solidTest(this.image[index])) return true;
	}
	return false;
};

/* Helper function */
Object.defineProperty(World.View.Image.prototype, "_addDirection", {
	enumerable: false, writable: false,
	value: function(vectorsArray, i) {
		vectorsArray.push(this.direction.plus(new Vector(i, i))); }
}); 

/* Returns vectors to positions containing element of 'elementType' */
World.View.Image.prototype.reachable = function(elementType) {
	var vectors = [];
	for (var i = 0; i < this.image.length; ++i) {
		if (World.Elements.hasType(this.image[i], elementType))
			this._addDirection(vectors, i);
		else if (this.isSolid(i))
			break;
	}
	return vectors;
};

/* Returns vectors to positions containing element of 'elementType' */
World.View.Image.prototype.visible = function(elementType) {
	var vectors = [];
	for (var i = 0; i < this.image.length; ++i) {
		if (World.Elements.hasType(this.image[i], elementType))
			this._addDirection(vectors, i);
	}
	return vectors;
};

/* Possible move vectors */
World.View.Image.prototype.possibleMoves = function() {
	var vectors = [];
	for (var i = 0; i < this.image.length; ++i) {
		if (this.image[i] === undefined || this.isSolid(i))
			break;
		else this._addDirection(vectors, i);
	}
	return vectors;
};

/* =Array of vectors
 * ------------------------------------------------------------ */
World.View.closest = function(vectors) {
	return vectors.reduce(function(a, b) {
		return a ? (a.x+a.y < b.x+b.y ? a : b) : b; });
};

World.View.farthest = function(vectors) {
	return vectors.reduce(function(a, b) {
		return a ? (a.x+a.y > b.x+b.y ? a: b) : b; });
};
