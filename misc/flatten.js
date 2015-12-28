var concat = (a, b) => Array.prototype.concat.call(a, b);

var ifelse = function(pred, fa, fb) {
	return function () {
		return pred.apply(this, arguments) ?
			fa.apply(this, arguments) : fb.apply(this, arguments);
	};
};

var secondArgIsArray = (_, a) => Array.isArray(a);

function flatten(array) {
   return array.reduce(ifelse(secondArgIsArray,
							(a, b) => concat(a, flatten(b)),
							 concat));
}

var a = [ ['a1', 'a2'], 'b', ['c1', 'c2', ['ca1', 'ca2'], 'c3'],  ];
