/*global $, R*/

function createCanvas() {
  var canvas = setAttr(document.createElement('canvas'),
					   'id', 'mainCanvas');
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

var c = canvas.getContext('2d');

c.imageSmoothingEnabled = false;

/**
 * @param {CanvasRenderingContext2D} context - Rendering context
 * @param {string} color - CSS style color
 * @param {Vector2} size - Width and height in pixels
 * @param {Vector2} pos - Top-left corner position in pixels
 */
var drawRec = R.curry(function(context, color, size, pos) {
  context.fillStyle = color;
  context.fillRect(pos.x, pos.y, size.x, size.y);
})(c);

drawRec('rgba(255, 170, 200, 0.5)', vec(80, 80), vec(35, 30));

c.fillStyle = 'rgba(200, 255, 170, 0.7)';
c.fillRect(10, 10, 80, 80);
