var url = prompt("Get this url...", "https://google.com/");
getAndOutput(url);

function getAndOutput(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState !== 4) return;
		if (req.status !== 200) {
			console.log("ERROR: "+req.status); return; }

		console.log("done");
		outputTextToPage(req.responseText);
	};
}

function outputTextToPage(text) {
	var container = document.getElementById("outputContainer") ||
		document.createElement("div");
	container.setAttribute("id", "outputContainer");

	container.appendChild(document.createTextNode(text));
	document.body.appendChild(container);
}
