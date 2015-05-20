var legend = (function() {

	/* =Character map
	 * ------------------------------------------------------------ */
	var legend = {
		"#": [ Wall ],
		" ": [ EmptySpace ],
		"o": [ Critter, EmptySpace]
	};

	/* =Constructors
	 * ------------------------------------------------------------ */
	function EmptySpace() {
		this.type = "emptySpace";
		this.solid = false;
	}

	function Wall() {
		this.type = "wall";
		this.solid = true;
	}

	function Critter() {
		this.type = "critter";
		this.solid = true;
	}

	return legend;
})();
