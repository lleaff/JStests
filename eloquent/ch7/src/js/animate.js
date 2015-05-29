function LivingWorld(plan, legend, colorLegend, htmlNode) {
	/* World */
	this.world = new World(plan, legend);

	/* Convert the elements to characters */
	this.colorLegend = Output.processColorLegend(colorLegend, legend);

	this.print = function() {
		/* Clear the surface */
		this.surface.removeChild(this.surface.firstChild);

		Output.appendTaggedTextTo(
			this.surface.appendChild(document.createElement("SPAN")),
								  this.world.draw(),
								  this.colorLegend, "color",
								  { capitalize: true });
	};

	/* Drawing surface */
	this.surface = (function() {
		if (!htmlNode) htmlNode = document.getElementById("world");
		if (!htmlNode)
			throw new Error(
				"no #world found, create a container for world surface");

		var surface = htmlNode.children[0];
		if (!surface || surface.tagName !== "PRE") {
			surface = document.createElement("PRE");
			surface.setAttribute("class", "world");
			surface.setAttribute("style", "line-height:1em;");
			htmlNode.appendChild(surface);
		} 
		return surface;
	}).call(this);

	/* Reference container for DOM events */
	this.surface.parent = htmlNode; 

	/* Logic */
	this.updateSurface = function() {
		this.print();
	};

	this.tick = function() {
		this.world.turn();
		this.updateSurface();
	};

	/* Initialize */
	(function initialize() {
		/* Create dummy element so we don't have to check for child existence
		 *  in .print() */
		this.surface.appendChild(document.createElement("SPAN"));
		this.print();
	})();
}
