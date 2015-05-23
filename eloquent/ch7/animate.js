function LivingWorld(htmlNode, plan) {
	/* Drawing surface */
	this.surface = (function() {
		if (!htmlNode) htmlNode = document.getElementById("world");
		if (!htmlNode)
			throw new Error(
				"no #world found, create a container for world surface");

		var surface = htmlNode.children[0];
		if (!surface || surface.tagName !== "PRE") {
			surface = document.createElement("PRE");
			htmlNode.appendChild(surface);
		} 
		return surface;
	})();

	/* World */
	this.world = new World(plan);

	/* Logic */
	this.updateSurface = function() {
		this.surface.replaceChild(
			document.createTextNode(this.world.draw()),
			this.surface.children[0]);
	};

	this.tick = function() {
		this.world.turn();
		this.updateSurface();
	};
}
