var onWindowLoad = []; /* Array of functions to execute when window is loaded */

/* "button" node initialization
 *  eg: htmlButton("click me", alert("thx"), "document.body");
 *      htmlButton("me first", alert("ty!"), "document.body", document.body[0]);
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

(function() {
	var but = document.createElement("button");
	but.appendChild(document.createTextNode("button"));
	but.onclick = console.log.bind(console, "clicked!");
	onWindowLoad.push(function() { document.body.insertBefore(but, document.body[0]); });
})();

var but2 = htmlButton("Button n°2", console.log.bind(console, "n°2 clicked"), "document.body");
var but1 = htmlButton("Button n°1", console.log.bind(console, "n°1 clicked"), "document.body", but2);


window.onload = function() { onWindowLoad.forEach(function(el) { el(); }); };
