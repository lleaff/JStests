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
		for (var elem in legend) {
			if (legend[elem].type === type) {
				return legend[elem];
			}
		}
	}

	colorLegend = Output.reverseSetOfArrays(colorLegend);

	var processedLegend = {};
	Object.keys(colorLegend).forEach(function(element) {
		processedLegend[getElementOfType(element).ch] =
			colorLegend[element];
	});
	return processedLegend;
};
