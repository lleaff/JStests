/*global $, R*/

var equalsW = R.curry((val1, val2) => val1 == val2);

/*------------------------------------------------------------*/

var isFunction = (a) => typeof a === 'function';
var whenFunction = R.when(isFunction);
var ifFunction = R.ifElse(isFunction);

var fluentize = R.curry((length, methStr) =>
						function(obj) {
							var args = R.concat(
								R.slice(1, R.length(arguments), arguments),
								[obj]);
							return R.apply(R.compose(
								R.always(obj),
								R.invoker(length, methStr)),
								args);
						});
