'use strict';

/*global $, R*/

var equalsW = R.curry(function (val1, val2) {
  return val1 == val2;
});

/*------------------------------------------------------------*/

var isFunction = function isFunction(a) {
  return typeof a === 'function';
};
var whenFunction = R.when(isFunction);
var ifFunction = R.ifElse(isFunction);

var fluentize = R.curry(function (length, methStr) {
  return function (obj) {
    var args = R.concat(R.slice(1, R.length(arguments), arguments), [obj]);
    return R.apply(R.compose(R.always(obj), R.invoker(length, methStr)), args);
  };
});

/*global $, R*/

/**
 * @param {number} length: Arity of fn.
 * @param {array} args - List of arguments which will be split in arrays of
 *  'length' length.
 */
var repeatApply = R.curry(function (length, fn, args) {
  return map(R.aperture(length), R.apply(fn));
});

var repeatCall = R.partial(R.compose(R.apply(repeatApply), R.concat));

var getCss = R.invoker(1, 'style');
var setCss = fluentize(2, 'style');

var getAttr = R.invoker(1, 'getAttribute');
var setAttr = fluentize(2, 'setAttribute');

var width = R.prop('clientWidth');
var height = R.prop('clientWidth');

function createCanvas() {
  var canvas = setAttr(document.createElement('canvas'), 'id', 'mainCanvas', 'width', '600px', 'height', '350px');
  /*.attr({
  'width':  '600px',
  'height': '350px'
  }).css({
    'border': '1px solid #eeeeee',
    'margin': '0 auto'
  });*/
  return canvas;
}

/*------------------------------------------------------------*/
var vec = function vector2(x, y) {
  return { x: x, y: y };
};

/*------------------------------------------------------------*/

var canvas = createCanvas();
document.body.appendChild(canvas);

var c = canvas.getContext('2d');

c.imageSmoothingEnabled = false;

/**
 * @param {CanvasRenderingContext2D} context - Rendering context
 * @param {string} color - CSS style color
 * @param {Vector2} size - Width and height in pixels
 * @param {Vector2} pos - Top-left corner position in pixels
 */
var drawRec = R.curry(function (context, color, size, pos) {
  context.fillStyle = color;
  context.fillRect(pos.x, pos.y, size.x, size.y);
})(c);

drawRec('rgba(255, 170, 200, 0.5)', vec(80, 80), vec(35, 30));

c.fillStyle = 'rgba(200, 255, 170, 0.7)';
c.fillRect(10, 10, 80, 80);
//# sourceMappingURL=sourcemaps/all.js.map
