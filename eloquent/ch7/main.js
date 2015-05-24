function main() {
	var updateTime = 250;

	var worldsContainer = document.getElementById("worldsContainer");

	var worlds = Data.plans.map(function(plan) {
		var container = document.createElement("DIV");
		container.setAttribute("class", "world");
		worldsContainer.appendChild(container);

		return new LivingWorld(plan, container);
	});

	function startAnimation(world) {
		if (!world.intervalId)
			world.intervalId = setInterval(
				world.tick.bind(world), updateTime);
	}
	function stopAnimation(world) {
		clearInterval(world.intervalId);
		world.intervalId = null;
	}
	function toggleAnimation(world) {
		if (!world.intervalId) startAnimation(world);
		else stopAnimation(world);
	}

	worlds.forEach(function(world) {
		world.surface.onclick = toggleAnimation.bind(null, world);
		startAnimation(world);
	});

}
