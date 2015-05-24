(function loadScripts(scripts, callback) {
	var body = document.body;
	if (callback === undefined) callback = "main";

	function loadScript(scripts) {
		var source = scripts.shift();
		if (source === undefined) return;

		var script = document.createElement("script");
		body.appendChild(script);
		script.setAttribute("src", source);
		var scriptCallback = scripts[0] ?
			loadScript.bind(null, scripts) :
			function() {window[callback]();};
		script.addEventListener("load", scriptCallback);
	}
	loadScript(scripts);
})([
	"miscHelperFunctions.js",
	"vector.js",
	"grid.js",
	"world.js",
	"world_logic.js",
	"animate.js",
	"legend.js",
	"plans.js",
	"main.js"
]);
