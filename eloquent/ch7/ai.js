function Ai(actor) {
	this.actor = actor;
	this.world = this.actor.world;
}

/* =General
 * ------------------------------------------------------------ */
/**
 *  Move in the same direction the actor was moving in during the last turn
 *  @return {Vector} The move vector applied, or null */
Ai.prototype.keepMoving = function() {
	if (this.actor.dir) {
		var longestMove = this.actor.view.look(this.actor.dir)
												.possibleMoves().pop();
		if (longestMove) {
			return this.world.actions.move(this.actor, longestMove);
		}
	}
	return null;
};

/**
 * Move the calling actor toward an element of type 'elementType'
 * @param {Direction} defaultDirection Direction in which to move if
 *   no matching element is found
 * @return {Vector} The move vector applied, or null */
Ai.prototype.moveToward = function(elementType, defaultDirection) {
	var reachable = this.actor.view.reachable(elementType);
	shuffleArray(reachable); /* Avoid predictable resolution */
	var closestPos = World.View.closest(reachable);
	if (closestPos) {
		/* Moving toward element */
		return this.world.actions.move(this.actor, closestPos);
	} else {
		/* If no element of 'elementType' is in sight, move in specified
		 *  'defaultDirection' or a random valid one */
		if (defaultDirection === "undefined") {
			defaultDirection = this.actor.view.reacheable();
			World.direction.random();
		}
		return null; /* No element in sight */
	}
};

Ai.prototype.moveAlong = function(elementType, defaultDirection) {

};
