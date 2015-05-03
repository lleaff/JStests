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
fakeButt.appendChild(document.createElement("br"));
// <div>button-ton<br/></div>
fakeButt.appendChild(document.createTextNode("ton-ton!"));
// <div>button-ton<br/>ton-ton!</div>
fakeButt.setAttribute("style",
					  "background-color: #333;"+
						  "color: #ff6;"+
						  "display: block;"+
						  "font-size: 1em;"+
						  "width: 19em;"+
						  "height: 2.5em;");
//<div style="backgr...">button-ton</div>
fakeButt.onclick = function() {
alert("I'm a button!");
};

window.onload = function() {
	document.body.appendChild(button);
	document.body.insertBefore(fakeButt, button);
};
