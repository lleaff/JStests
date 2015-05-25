var colorLegend = {
	wall:		[ "wall" ],
	nature:		[ "plant", "flower" ],
	character:	[ "critter", "bouncingCriter" ],
	animal:		[ "wallHugger" ]
};

var legend = (function() {
	var legend = {
		EmptySpace: {
			name:		"emptySpace",
			type:		[ "floor" ],
			ch:			" ",
		},

		Wall: {
			name:		"wall",
			type:		[ "obstacle" ],
			ch:			"#",
			solid:		true,
			blockSight:	true,
		},

		Plant: {
			name:		"plant",
			type:		[ "vegetal" ],
			ch:			"+"
		},

		Flower: {
			name:		"flower",
			type:		[ "vegetal" ],
			ch:			"*"
		},

		Critter: {
			name:		"critter",
			type:		[ "animal" ],
			ch:			"o",
			solid:		true,
			speed:		1,
			sight:		1,
		},

		BouncingCriter: {
			name:		"bouncingCriter",
			type:		[ "animal" ],
			ch:			"@",
			solid:		true,
			act:		bouncingCriterAct,
			speed:		1,
			sight:		1,
		},

		WallHugger: {
			name:		"wallHugger",
			type:		[ "animal" ],
			ch:			"~",
			solid:		true,
			act:		wallHuggerAct,
			speed:		1,
			sight:		1,
		}
	};

	legend.default = legend.EmptySpace;

	function critterAct() {
	
	}

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
