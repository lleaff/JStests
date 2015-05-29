function main() {
	var updateTime = 0.1; /* seconds */

	var worldsContainer = document.getElementById("worldsContainer");

	var worlds = Data.plans.map(function(plan) {
		var container = document.createElement("DIV");
		container.setAttribute("class", "worldContainer");


		var worldInstance =
			 new LivingWorld(plan, legend, colorLegend, container);

		worldInstance.surface.overlay.addEventListener("click",
							 toggleAnimation.bind(null, worldInstance));

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
