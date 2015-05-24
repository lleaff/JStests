function LivingWorld(plan, htmlNode) {
	/* World */
	this.world = new World(plan, legend);

	/* Drawing surface */
	this.surface = (function() {
		if (!htmlNode) htmlNode = document.getElementById("world");
		if (!htmlNode)
			throw new Error(
				"no #world found, create a container for world surface");

		var surface = htmlNode.children[0];
		if (!surface || surface.tagName !== "PRE") {
			surface = document.createElement("PRE");
			surface.setAttribute("style", "line-height:1em;");
			surface.appendChild(
				document.createTextNode(this.world.draw()));
				htmlNode.appendChild(surface);
		} 
		return surface;
	}).call(this);


	/* Logic */
	this.updateSurface = function() {
		this.surface.replaceChild(
			document.createTextNode(this.world.draw()),
			this.surface.childNodes[0]);
	};

	this.tick = function() {
		this.world.turn();
		this.updateSurface();
	};
}
