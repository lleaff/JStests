/* Elements */
var container = document.createElement("div");
container.setAttribute("id", "container");
var containerText = document.createTextNode(
									"<div>I'm in div");
var containerTextEnd = document.createTextNode("I'm in div</div>");
container.appendChild(containerText);
container.appendChild(containerTextEnd);

var insert = document.createElement("span");
insert.setAttribute("id", "insert");
var insertText = document.createTextNode(
									"<span>I'm in span</span>");
insert.style.fontWeight = "bold";
insert.appendChild(insertText);

container.insertBefore(insert, container.lastChild);

document.body.appendChild(container);

/* Events */
function logEvent(event) {
	console.log("EVENT>\tCurrentTarget:\t#"+(event.currentTarget).id+
				"\n\tOriginalTarget:\t#"+(event.target).id);
}

container.addEventListener("click", logEvent);
insert.addEventListener("click", logEvent);
