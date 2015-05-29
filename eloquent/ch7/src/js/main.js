function main() {
	var updateTime = 0.1; /* seconds */

	var worldsContainer = document.getElementById("worldsContainer");

	var worlds = Data.plans.map(function(plan) {
		var container = document.createElement("DIV");
		container.setAttribute("class", "worldContainer");


		var worldInstance =
			 new LivingWorld(plan, legend, colorLegend, container);

		/* Create an overlay to catch click events, otherwise the span
		 *  elements disappear too quickly to bubble up their events */
		var overlay = document.createElement("DIV");
		overlay.setAttribute("class", "worldOverlay");
		/* Make the overlay hover over the whole container */
		container.style.position = "relative";
		overlay.setAttribute("style",
		   "width:100%; height:100%; position:absolute; top:0; bottom:0;");
		overlay.addEventListener("click",
							 toggleAnimation.bind(null, worldInstance));

		worldInstance.surface.overlay = overlay;
		container.appendChild(overlay);
		worldsContainer.appendChild(container);
		return worldInstance;

	});

	/* Control animation */
	function startAnimation(world) {
		if (!world.intervalId)
			world.intervalId = setInterval(
				world.tick.bind(world), updateTime*1000);
	}
	function stopAnimation(world) {
		clearInterval(world.intervalId);
		world.intervalId = null;
	}
	function toggleAnimation(world) {
		if (!world.intervalId) startAnimation(world);
		else stopAnimation(world);
	}

	/* Start animation */
	worlds.forEach(function(world) {
		startAnimation(world);
	});

}
