function LivingWorld(plan, legend, colorLegend, htmlNode) {
	/* World */
	this.world = new World(plan, legend);

	/* Convert the elements to characters */
	this.colorLegend = Output.processColorLegend(colorLegend, legend);

	this.print = function() {
		Output.appendTaggedTextTo( this.surface, this.world.draw(),
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
			this.print();
			htmlNode.appendChild(surface);
		} 
		return surface;
	}).call(this);


	/* Logic */
	this.updateSurface = function() {
		/* Clear the surface */
		while(this.surface.lastChild)
			this.surface.removeChild(this.surface.lastChild);

		this.print();
	};

	this.tick = function() {
		this.world.turn();
		this.updateSurface();
	};
}
