function Ai(actor) {
	this.actor = actor;
}

Ai.prototype.keepMoving = function() {
	if (this.actor.dir) {
		var longestMove = this.actor.view.look(this.actor.dir)
												.possibleMoves().pop();
		if (longestMove) {
			this.actor.world.actions.move(this.actor, longestMove);
			return longestMove;
		}
	}
	return false;
};
