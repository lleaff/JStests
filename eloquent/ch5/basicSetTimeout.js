var onWindowLoad = []; /* Array of functions to execute when window is loaded */

(function() {
	var but = document.createElement("button");
	but.appendChild(document.createTextNode("button"));
	but.onclick = console.log.bind(console, "clicked!");
	onWindowLoad.push(function() { document.body.insertBefore(but, document.body[0]); });
})();



window.onload = function() { onWindowLoad.forEach(function(el) { el(); }); };
