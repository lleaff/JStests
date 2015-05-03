var button = document.createElement("button");
button.appendChild(document.createTextNode("Click me!"));
button.onclick = function() {
	alert("Yo");
};
button.style = { backgroundColor: "#f00" };

var fakeButt = document.createElement("div");
// <div></div>
fakeButt.appendChild(document.createTextNode("button-ton!"));
// <div>button-ton</div>
fakeButt.setAttribute("style",
					  "background-color: #100; color: #ff6; display: block; font-size: 1em; width: 6em");
//<div style="backgr...">button-ton</div>
fakeButt.onclick = function() {
alert("I'm a button!");
};

window.onload = function() {
	document.body.appendChild(button);
	document.body.insertBefore(fakeButt, button);
};
