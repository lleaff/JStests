if (!Output) var Output = {};

/* { key1: [value1, value2] } => { value1: key1, value2: key1 } */
Output.reverseSetOfArrays = function(oldSet) {
	var newSet = {};
	Object.keys(oldSet).forEach(function(key) {
		oldSet[key].forEach(function(value) {
			newSet[value] = key; });
	});
	return newSet;
};

/* Prepare a { color: [elementTypes] } legend for use by
 *   appendTaggedTextTo()  */
Output.processColorLegend = function(colorLegend, legend) {
	function getElementOfType(type) {
		for (var elem in legend)
			if (legend[elem].type === type)
				return legend[elem];
	}

	colorLegend = Output.reverseSetOfArrays(colorLegend);

	var processedLegend = {};
	Object.keys(colorLegend).forEach(function(element) {
		processedLegend[getElementOfType(element).ch] =
			colorLegend[element];
	});
	return processedLegend;
};

/* 'colorLegend' must be a set of character: className */
Output.appendTaggedTextTo = function(
	element, string, colorLegend, cssClassPrefix, cssClassNameOptions) {
	if (element === undefined) element = document.createElement("div");

	function prependClassPrefix(cssClassName) {
		if (cssClassNameOptions.capitalize) {
			cssClassName = cssClassName.charAt(0).toUpperCase() +
				cssClassName.slice(1);
		}
		return cssClassPrefix + cssClassName;
	}

	function tagAndAppend(str) {
		var tag;
		if (colorLegend[str[0]]) {
			tag = document.createElement("span");
			tag.setAttribute("class",
							 prependClassPrefix(colorLegend[str[0]]));
			tag.appendChild(document.createTextNode(str));
		} else {
			tag = document.createTextNode(str);
		}
		element.appendChild(tag);
	}

	/* Go over each character in the string */
	for (var i = 0, buffer = ""; i < string.length; ++i) {
		buffer += string[i];
		/* If character sequence ends, process buffer and reset it */
		if (string[i + 1] !== string[i]) {
			tagAndAppend(buffer);
			buffer = "";
		}
	}

	return element;
};

