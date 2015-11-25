/*global $, R*/

/**
 * @param {number} length: Arity of fn.
 * @param {array} args - List of arguments which will be split in arrays of
 *  'length' length.
 */
var repeatApply = R.curry((length, fn, args) => map(
	R.aperture(length),
	R.apply(fn)));

var repeatCall = R.partial(
	R.compose(R.apply(repeatApply),
			  R.concat));

var getCss = R.invoker(1, 'style');
var setCss = fluentize(2, 'style');

var getAttr = R.invoker(1, 'getAttribute');
var setAttr = fluentize(2, 'setAttribute');

var width = R.prop('clientWidth');
var height = R.prop('clientWidth');
