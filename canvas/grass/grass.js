/*global $, R*/

function init() {
  var canvas = $('<canvas>', {
    id: 'mainCanvas'
  }).css({
    'width'            : '100%',
    'height'           : '100%',
    'max-width'        : '50rem',
    'max-height'       : '25rem',
    'background-color' : '#f0f0f0'
  });

  canvas.appendTo('body');
  return canvas;
}

/*------------------------------------------------------------*/

var equalsW = R.curry((val1, val2) => val1 == val2);

/**
 * Returns a function of the specified arity that calls an object's method.
 * @param {number} length - Arity of returned function, null to let R.curry
 *  detect it automatically.
 * @param {string} meth - Method name.
 * @param {object} obj - Object to call method on.
 * @return {function}
*/
var methodN = R.curry(function (length, meth, obj) {
  return (length !== null ? R.curryN(length) : R.curry)(
    function() {
      return obj[meth].apply(obj, arguments);
    });
});

var method = methodN(null);

var getAttr = R.curry((prop, obj) =>
                R.compose(R.flip(R.apply)([prop]), method('attr'))(obj));
var setAttr = R.curry((prop, val, obj) =>
                R.compose(R.flip(R.apply)([prop, val]), method('attr'))(obj));

var getCss = R.curry((prop, obj) =>
                R.compose(R.flip(R.apply)([prop]), method('css'))(obj));
var setCss = R.curry((prop, val, obj) =>
                R.compose(R.flip(R.apply)([prop, val]), method('css'))(obj));

var width = getCss('width');

/*------------------------------------------------------------*/

var canvas = init();
