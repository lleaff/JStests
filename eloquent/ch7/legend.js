var legend = (function() {
	var legend = {
		EmptySpace: {
			type:		 "emptySpace",
			ch:			 " ",
			solid:		 false,
		},

		Wall: {
			type:		 "wall",
			ch:			 "#",
			solid:		 true,
			blockSight:	 true,
		},

		Critter: {
			type:		 "critter",
			ch:			 "o",
			solid:		 true,
			speed:		 1,
			sight:		 1,
		},

		BouncingCriter:  {
			type:		 "bouncingCriter",
			ch:			 "@",
			solid:		 true,
			act:		 bouncingCriterAct,
			speed:		 1,
			sight:		 1,
		}
	};

	legend.default = legend.EmptySpace;

	function bouncingCriterAct(world) {
		if (!this.view.isTrapped()) {
			while (!this.dir || !this.view.look(this.dir).canMove())
				this.dir = World.direction.random();

			world.actions.move(this, this.dir);
		}
	}

	return legend;
})();
