/*global $, R*/

var equalsW = R.curry((val1, val2) => val1 == val2);

/*------------------------------------------------------------*/
/**
 * @param {number} length: Arity of fn.
 * @param {array} args - List of arguments which will be split in arrays of
 *  'length' length.
 */
var repeatApply = R.curry((length, fn, args) => R.map(
	R.apply(fn),
	R.splitEvery(length, args)));

var repeatCall = R.partial(
	R.compose(R.apply(repeatApply),
			      R.concat));

/*------------------------------------------------------------*/

var whenFunction = R.when(R.is(Function));
var ifFunction = R.ifElse(R.is(Function));

var fluentize = R.curry((length, methStr) =>
						function(obj) {
							var args = R.concat(
								R.slice(1, R.length(arguments), arguments),
								[obj]);
							return R.head(repeatApply(length,
                                 R.compose(
                                   R.always(obj),
                                   R.invoker(length, methStr)),
                                        args));
            });
