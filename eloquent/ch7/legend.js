var legend = (function() {

	/* =Constructors
	 * ------------------------------------------------------------ */
	var constructors = {
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
		},
	};

	/* =Character map
	 * ------------------------------------------------------------ */
	/* Build a map of characters->constructors */
	var legend = (function() {
		var legend = {};
		for (var constructor in constructors) {
			/* Create a new element from the constructor to be able to
			 *  extract its ch property */
			var elem = new constructors[constructor]();
			legend[elem.ch] = [ constructors[constructor] ];
			/* If the element can move, put empty space under it */
			if (elem.speed) legend[elem.ch].push(constructors.EmptySpace);
		}
		return legend;
	})();

	/* =Act methods
	 * ------------------------------------------------------------ */
	function bouncingCriterAct() {

	}

	return legend;
})();
