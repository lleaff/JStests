var onWindowLoad = []; /* Array of functions to execute when window is loaded */

/* "button" node initialization
 *  Use a string if you want to reference an element that doesn't yet exist
 *  eg: htmlButton("click me", alert("thx"), "document.body");
 *      htmlButton("me first", alert("ty!"), "document.body", document.body.children[0]);
 *   => <body>
 *          <button onclick=alert("ty!")>me first</button>
 *          <button onclick=alert("thx")>click me</button>
 *      </body>                                                             */
function htmlButton(text, onclick, refElem, beforeThisElement)
{
	var but = document.createElement("button");
	if (text !== undefined && text !== null) but.appendChild(document.createTextNode(text));
	if (onclick) but.onclick = onclick;
	if (refElem !== undefined) {
		if (beforeThisElement === undefined)
			onWindowLoad.push(function() { 
				(typeof refElem === "string" ? (eval(refElem)) : refElem).appendChild(but); });
		else
			onWindowLoad.push(function() { 
				(typeof refElem === "string" ? (eval(refElem)) : refElem).insertBefore(but, beforeThisElement);
			});
	}
	return but;
}

var but2 = htmlButton("Button n°2", setTimeout.bind(null, console.log.bind(console, "n°2...clicked..."), 300), "document.body");
var but1 = htmlButton("Button n°1", console.log.bind(console, "n°1 clicked"), "document.body", but2);

(function() {
	var but1 = document.createElement("button");
	but1.appendChild(document.createTextNode("Button n°0"));
	but1.onclick = console.log.bind(console, "n°0 clicked");
	onWindowLoad.push(function() { document.body.insertBefore(but1, document.body.children[0]); });
})();


window.onload = function() { onWindowLoad.forEach(function(el) { el(); }); };
