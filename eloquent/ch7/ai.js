function Ai(actor) {
	this.actor = actor;
	this.world = this.actor.world;
}

/* =General
 * ------------------------------------------------------------ */
Ai.prototype.keepMoving = function() {
	if (this.actor.dir) {
		var longestMove = this.actor.view.look(this.actor.dir)
												.possibleMoves().pop();
		if (longestMove) {
			this.world.actions.move(this.actor, longestMove);
			return longestMove;
		}
	}
	return false;
};

Ai.prototype.moveToward = function(elementType, defaultDirection) {
	var reachable = this.actor.view.reachable(elementType);
	shuffleArray(reachable); /* Avoid predictable resolution */
	var closestPos = World.View.closest(reachable);
	if (closestPos) {
		this.world.actions.move(
			 this.actor, closestPos);
		return true;		/* Moving toward element */
	} else {
		/* If no element of 'elementType' is in sight, move in specified
		 *  'defaultDirection' or a random valid one */
		if (defaultDirection === "undefined") {
			defaultDirection = this.actor.view.reacheable();
			World.direction.random();
		}
		return false;		/* No element in sight */
	}
};

Ai.prototype.moveAlong = function(elementType, defaultDirection) {

};
