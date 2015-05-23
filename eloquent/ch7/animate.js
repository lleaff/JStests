function LivingWorld() {
	/* Drawing surface */
	var surfaceContainer = document.getElementById("world");
	if (!surfaceContainer)
		throw new Error(
			"no #world found, create a container for world surface");
	var surface = surfaceContainer.children[0];
	if (!surface || surface.tagName !== "PRE") {
		surface = document.createElement("PRE");
		surfaceContainer.appendChild(surface);
	} 
	this.surface = surface;
}
