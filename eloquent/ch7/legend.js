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

	function bouncingCriterAct() {
		/* TODO bouncing criter AI */
	}

	return legend;
})();
