var legend = (function() {
	var legend = {
		EmptySpace: function() {
			this.type 	= "emptySpace";
			this.ch		= " ";
			this.solid	= false;
		},

		Wall: function() {
			this.type 	= "wall";
			this.ch		= "#";
			this.solid 	= true;
		},

		Critter: function() {
			this.type 	= "critter";
			this.ch		= "o";
			this.solid 	= true;
			this.speed 	= 1;
		},

		BouncingCriter: function() {
			this.type	= "bouncingCriter";
			this.ch		= "@";
			this.solid 	= true;
			this.speed 	= 1;
			this.act	= bouncingCriterAct;
		}
	};

	legend.default = legend.EmptySpace;

	function bouncingCriterAct() {
		/* TODO bouncing criter AI */
	}

	return legend;
})();
