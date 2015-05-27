/* =Turn logic
 * ----------------------------------------------------------- */
World.prototype.turn = function() {
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
			this, elemPos.elem, elemPos.position);
		elemPos.elem.act();
	}, this);
};

/* =Actions
 * ------------------------------------------------------------ */
World.Actions = function(world) {
	return {
		/* The actor's current View is stored in its .view property */

		/** 
		 * Try moving the actor in the specified direction 
		 * @param {Actor} actor Element to move
		 * @param {Direction/Vector} direction Direction to move in, or
		 *   direct move vector to try applying
		 * @param {integer} distance Number of times to try to apply
		 *   the direction vector. Must be left out if 'direction' is
		 *   a direct move vector
		 * @return {Vector} Movement vector actually applied or null */
		move: function(actor, direction, distance) {
			if (distance === undefined) {
				if (Math.abs(direction.x) > 1) {
					distance = Math.abs(direction.x);
					direction =
						World.direction.vectorToDirection(direction);
				} else if (Math.abs(direction.y) > 1) {
					distance = Math.abs(direction.y);
					direction =
						World.direction.vectorToDirection(direction);
				} else {
					distance = actor.speed; }
			}
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

			/* Update actor's direction property */
			actor.dir = i ? direction : null;

			return i ? moveVec : null;
		},
	};
};

/* =Elements
 * ------------------------------------------------------------ */
if (World.Element === undefined) World.Element = {};
if (World.Elements === undefined) World.Elements = {};

World.Element.hasType = function(element, elementType) {
	return element.type.indexOf(elementType) !== -1;
};

World.Elements.hasType = function(elements, elementType) {
	return elements.filter(function(el) {
		return World.Element.hasType(el, elementType); }).length;
};
