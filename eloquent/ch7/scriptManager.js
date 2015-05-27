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
	"world_directions.js",
	"world_perception.js",
	"ai.js",
	"legend.js",
	"color.js",
	"plans.js",
	"animate.js",
	"main.js"
].map(function(scriptName) {
	return "js/"+scriptName;
}));
