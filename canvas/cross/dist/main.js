'use strict';

var canvas = document.getElementById('canvas');

var width = canvas.getAttribute('width') >> 0;
var height = canvas.getAttribute('height') >> 0;

var c = canvas.getContext('2d');

var middle = { x: width * 0.5, y: height * 0.5 };
var topLeft = { x: width * 0.25, y: height * 0.25 };
var bottomRight = { x: width * 0.75, y: height * 0.75 };

function drawCross(topLeft, bottomRight) {
  var topRight = { x: bottomRight.x, y: topLeft.y };
  var bottomLeft = { x: topLeft.x, y: bottomRight.y };

  c.beginPath();
  c.moveTo(topLeft.x, topLeft.y);
  c.lineTo(bottomRight.x, bottomRight.y);
  c.moveTo(topRight.x, topRight.y);
  c.lineTo(bottomLeft.x, bottomLeft.y);
  c.stroke();
}

function drawCrossAt(middle, width) {
  var offset = width / 2;
  return drawCross({ x: middle.x - offset, y: middle.y - offset }, { x: middle.x + offset, y: middle.y + offset });
}

drawCross(topLeft, bottomRight);

var addVec2d = function addVec2d(v, n) {
  return { x: v.x + n, y: v.y + n };
};
var addVecs2d = function addVecs2d(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
};

drawCrossAt(addVecs2d(middle, { x: 0, y: 5 }), width * 0.45);
drawCrossAt(addVecs2d(middle, { x: 0, y: -5 }), width * 0.45);
//# sourceMappingURL=sourcemaps/main.js.map
