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
		elemPos.elem.act();
	});
};

/* =Actions
 * ------------------------------------------------------------ */
World.Actions = function(world) {
	return {
		/* The actor's current View is stored in its .view property */

		move: function(actor, direction, distance) {
			if (distance === undefined) distance = actor.speed;
			var moveVec = new Vector(0, 0);
			var image = actor.view.look(direction, distance);
			/* Stop movement at first obstacle */
			for (var i = 0; i < distance; ++i) {
				if (image.image && !image.isSolid(i))
					moveVec.add(direction);
				else
					break;
			}

			if (moveVec.x === 0 && moveVec.y === 0) /* has moved? */
				return false;
			world.moveElement(actor.view.position,
							  actor.view.position.plus(moveVec), actor);

			return i; /* Times direction vector was applied */
		},
	};
};
