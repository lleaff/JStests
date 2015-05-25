/* 'plan' can be either a Grid object or a string, 'legend' must be a set
 *  of element object prototypes, with a 'default' property pointing to
 *  the default element.
 * An element has the following properties:
 *  (* = mandatory, [] = default value)
 * *ch:			character representing the element on the plan.
 *  act:		function to be executed every turn, takes the world
 *      		  object as argument and can refer to the actor as 'this',
 *      		  with 'this.view' being an up-to-date View object. Use
 *      		  the methods in 'world.actions' for various interactions.
 *  speed:		maximum speed at which the element can move
 *  solid:		[false] can the element be passed through?
 *  sight:		number of elements returned by 'actor.view.look()'
 *  blockSight:	[false] does the element blocks vision?
 *  */
function World(plan, legend) {
	var grid = (typeof plan === "object") ? plan : Grid.parse(plan);

	legend = World.charMapFromElemMap(legend);

	this.grid = World.charGridToElemGrid(grid, legend, this);
	this.legend = legend;
	this.actions = new World.Actions(this);
}

/* =Helper functions
 * ------------------------------------------------------------ */
World.charToElements = function(ch, legend) {
	var elements = legend[ch].map(function(element) {
		var instance = Object.create(element);
		instance.prototype = element;
		return instance;
	});
	return elements;
};
World.charGridToElemGrid = function(grid, legend, world) {
	return grid.map(function(char) {
		var elems = World.charToElements(char, legend);
		/* Add 'world' property to actors */
		elems.forEach(function(el, i, elems) { 
			if (el.act) el.world = world;
		});
		return elems;
	});
};

World.elementToChar = function(element) {
	return element.ch;
};
World.elemGridToCharGrid = function(grid) {
	return grid.map(function(elements) {
		return elements.reduce(function(a, elem) {
			return (elem.solid) ? elem : a; },
			elements[0]).ch;
	});
};

World.prototype.draw = function() {
	return World.elemGridToCharGrid(this.grid).toString();
};
World.prototype.toString = World.prototype.draw;

/* Build a map of characters->elementPrototypes from a map of
 *  elementName->elementPrototypes */
World.charMapFromElemMap = function(elements) {
	var legend = {};
	for (var element in elements) {
		var elem = elements[element];
		if (!elem.ch) continue; /* skip bogus properties */
		legend[elem.ch] = [ elements[element] ];
		/* If the element can move, put default element under it */
		if (elem.speed) legend[elem.ch].push(elements.default);
	}
	return legend;
};

/* =Interaction with elements
 * ------------------------------------------------------------ */
World.prototype.addElement = function(position, instance) {
	this.grid.get(position).push(instance);
};

World.prototype.removeElement = function(position, instance) {
	var elements = this.grid.get(position);
	elements.splice(elements.indexOf(instance), 1);
};

World.prototype.moveElement = function(position1, position2, instance) {
	this.addElement(position2, instance);
	this.removeElement(position1, instance);
};
