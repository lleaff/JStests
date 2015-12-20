/*global $, R*/

var getCss = R.invoker(1, 'style');
var setCss = fluentize(2, 'style');

var getAttr = R.invoker(1, 'getAttribute');
var setAttr = fluentize(2, 'setAttribute');

var width = R.prop('clientWidth');
var height = R.prop('clientWidth');
