var button = document.createElement("button");
button.appendChild(document.createTextNode("Click me!"));
button.onclick = function() {
	alert("Yo");
};
window.onload = function() {
	document.body.appendChild(button);
};
