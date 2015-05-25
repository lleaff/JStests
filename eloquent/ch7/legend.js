var colorLegend = {
	wall:		[ "wall" ],
	nature:		[ "plant" ],
	character:	[ "critter", "bouncingCriter" ],
	animal:		[ "wallHugger" ]
};

var legend = (function() {
	var legend = {
		EmptySpace: {
			type:		"emptySpace",
			ch:			" ",
		},

		Wall: {
			type:		"wall",
			ch:			"#",
			solid:		true,
			blockSight:	true,
		},

		Plant: {
			type:		"plant",
			ch:			"+"
		},

		Critter: {
			type:		"critter",
			ch:			"o",
			solid:		true,
			speed:		1,
			sight:		1,
		},

		BouncingCriter: {
			type:		"bouncingCriter",
			ch:			"@",
			solid:		true,
			act:		bouncingCriterAct,
			speed:		1,
			sight:		1,
		},

		WallHugger: {
			type:		"wallHugger",
			ch:			"~",
			solid:		true,
			act:		wallHuggerAct,
			speed:		1,
			sight:		1,
		}
	};

	legend.default = legend.EmptySpace;

	function bouncingCriterAct() {
		if (!this.view.isTrapped()) {
			while (!this.dir || !this.ai.keepMoving())
				this.dir = World.direction.random();

		}
	}

	function wallHuggerAct() {
		if (!this.view.isTrapped()) {
			if (!this.dir) this.dir = World.direction.random();
			if (!this.view.look(this.dir).possibleMoves()[0]) {

			}
		}
	}

	return legend;
})();
