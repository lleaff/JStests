'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cropNumAt = function cropNumAt(at, num) {
  function cropNumAtAt(num) {
    return (num * Math.pow(10, at) >> 0) / Math.pow(10, at);
  }
  return num === undefined ? cropNumAtAt : cropNumAtAt(num);
};

var add = function add(x, y) {
  function addx(y) {
    return x + y;
  }
  return y === undefined ? addx : addx(y);
};
var mult = function mult(x, y) {
  function multx(y) {
    return x * y;
  }
  return y === undefined ? multx : multx(y);
};
var div = function div(x, y) {
  function divx(y) {
    return x / y;
  }
  return y === undefined ? divx : divx(y);
};

function zipWithObj(f, a, b) {
  function zipWithObjF(a, b) {
    function zipWithObjFA(b) {
      var newObj = a.prototype ? Object.create(a.prototype) : {};
      Object.keys(a).forEach(function (key) {
        return newObj[key] = f(a[key], b[key]);
      });
      return newObj;
    }
    if (b === undefined) {
      return zipWithObjFA;
    } else {
      return zipWithObjFA(a, b);
    }
  }
  if (a === undefined) {
    return zipWithObjF;
  } else {
    return zipWithObjF(a, b);
  }
}

/*------------------------------------------------------------*/

var canvas = document.getElementById('canvas');

var c = canvas.getContext('2d');
var W = canvas.getAttribute('width');
var H = canvas.getAttribute('height');

/*------------------------------------------------------------*/

/**
 * Curried `x` percents of `of`
 */
function p(of, x) {
  function pof(x) {
    return x / 100 * of;
  }
  return x === undefined ? pof : pof(x);
}

/**
 * Curried wrap `x` between `lo` and `hi`
 */
function wrap(lo, hi, x) {
  function wraplo(hi, x) {
    var range = hi - lo;
    function wraplohi(x) {
      if (x > hi) {
        return (x - lo) % range + lo;
      } else if (x < lo) {
        return hi + (x - lo) % range;
      } else {
        return x;
      }
    }
    return x === undefined ? wraplohi : wraplohi(x);
  }
  return hi === undefined ? wraplo : wraplo(hi, x);
}

/*------------------------------------------------------------*/

function Vec2D(x, y) {
  this.x = x;
  this.y = y;
}
/**
 * Curried zipWithObj bound to Vec2D instance.
 */
Vec2D.prototype.zipWith = function (f, v) {
  function zipWithF(v) {
    return new Vec2D(f(this.x, v.x), f(this.y, v.y));
  }
  return v === undefined ? zipWithF : zipWithF(v);
};
Vec2D.prototype.add = Vec2D.prototype.zipWith(add);
Vec2D.prototype.mult = Vec2D.prototype.zipWith(mult);
Vec2D.prototype.div = Vec2D.prototype.zipWith(div);

Vec2D.prototype.moveTo = function (context) {
  (context || ctx).moveTo(this.x, this.y);
};
Vec2D.prototype.lineTo = function (context) {
  (context || ctx).lineTo(this.x, this.y);
};

function vec(x, y) {
  return new Vec2D(x, y);
}

/*------------------------------------------------------------*/

var Path = (function () {
  function Path() {
    _classCallCheck(this, Path);
  }

  _createClass(Path, [{
    key: 'baboon',
    get: function get() {
      return 'BABOON';
    }
  }], [{
    key: 'stroke',
    value: function stroke(ctx) {
      ctx.beginPath();
      ctx.moveTo(this[0]);
      this.forEach(function (v) {
        v.lineTo(ctx);
      });
      ctx.stroke();
    }
  }]);

  return Path;
})();

/*------------------------------------------------------------*/

function Line(a, b) {
  this[0] = a;
  this[1] = b;
}
Object.defineProperty(Line.prototype, 'a', {
  get: function get() {
    return this[0];
  },
  set: function set(val) {
    this[0] = val;
  }
});
Object.defineProperty(Line.prototype, 'b', {
  get: function get() {
    return this[1];
  },
  set: function set(val) {
    this[1] = val;
  }
});
function line(a, b) {
  return new Line(a, b);
}

/*------------------------------------------------------------*/

function drawCross() {
  var ctx = arguments.length <= 0 || arguments[0] === undefined ? ctx : arguments[0];
  var width = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];
  var point = arguments[2];
  var slanted = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  var s = width / 2;
  if (slanted) {
    ctx.moveTo(point.x - s, point.y - s);
    ctx.lineTo(point.x + s, point.y + s);
    ctx.moveTo(point.x + s, point.y - s);
    ctx.lineTo(point.x - s, point.y + s);
  } else {
    ctx.moveTo(point.x - s, point.y);
    ctx.lineTo(point.x + s, point.y);
    ctx.moveTo(point.x, point.y - s);
    ctx.lineTo(point.x, point.y + s);
  }
}

/*------------------------------------------------------------*/

var wrapRadian = wrap(0, Math.PI * 2);

var Arc = (function () {
  function Arc(center, radius) {
    var start = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var end = arguments.length <= 3 || arguments[3] === undefined ? Math.PI * 2 : arguments[3];

    _classCallCheck(this, Arc);

    this.center = center;
    this.radius = radius;
    this.start = start;
    this.end = end;
  }

  _createClass(Arc, [{
    key: 'mapStartEnd',
    value: function mapStartEnd(f) {
      var orientation = this._start > this._end;

      var start = f(this._start);
      var end = f(this._end);
      var startWrapped = wrapRadian(start);
      var endWrapped = wrapRadian(end);
      var startWrapOffset = startWrapped - start;
      var endWrapOffset = endWrapped - end;
      if (startWrapOffset && !endWrapOffset) {
        endWrapped = end + startWrapOffset;
      } else if (endWrapOffset && !startWrapOffset) {
        startWrapped = start + endWrapOffset;
      }

      if (start > end != orientation) {
        this._start = end;
        this._end = start;
      } else {
        this._start = startWrapped;
        this._end = endWrapped;
      }
      this.onchange();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var ctx = arguments.length <= 0 || arguments[0] === undefined ? ctx : arguments[0];

      ctx.arc(this.center.x, this.center.y, Math.max(1, this.radius), this.start, this.end);
      drawCross(ctx, 7, this.center);
    }
  }, {
    key: 'stroke',
    value: function stroke() {
      var ctx = arguments.length <= 0 || arguments[0] === undefined ? ctx : arguments[0];

      ctx.beginPath();
      this.draw(ctx);
      ctx.stroke();
    }
  }, {
    key: 'onchange',
    value: function onchange() {}
  }, {
    key: 'start',
    get: function get() {
      return this._start;
    },
    set: function set(rad) {
      this._start = wrapRadian(rad);
      this.onchange();
    }
  }, {
    key: 'end',
    get: function get() {
      return this._end;
    },
    set: function set(rad) {
      this._end = wrapRadian(rad);
      this.onchange();
    }
  }]);

  return Arc;
})();

/*------------------------------------------------------------*/

function canvasMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  function canvasMousePosCanvas(e) {
    return vec(e.clientX - rect.left, e.clientY - rect.top);
  }
  return e === undefined ? canvasMousePosCanvas : canvasMousePosCanvas(e);
}

function clearCanvas() {
  var ctx = arguments.length <= 0 || arguments[0] === undefined ? ctx : arguments[0];

  ctx.clearRect(0, 0, W, H);
}

/*------------------------------------------------------------*/

var pw = p(W);
var ph = p(H);
var PI = Math.PI;
var pc = p(Math.PI * 2);

/**
 * @param {Line} rectangle
 * @param {Vec2D} point
 */
function closestDistanceFromRectangleSide(rectangle, point) {
  return Math.min(Math.abs(rectangle[0].x - point.x), Math.abs(rectangle[0].y - point.y), Math.abs(rectangle[1].x - point.x), Math.abs(rectangle[1].y - point.y));
}

var arc = new Arc(vec(pw(50), ph(50)), 0, pc(80), pc(90));

arc.calculateRadius = function () {
  var maxContainedRadius = closestDistanceFromRectangleSide(line(vec(0, 0), vec(W, H)), this.center) - 2;
  this.radius = maxContainedRadius;
};

arc.step = function (rad) {
  arc.calculateRadius();
  this.mapStartEnd(add(rad));
};

/*------------------------------------------------------------*/

var arcStep = 0.1;

var scene = {};
var drawCalls = [];

scene.draw = function () {
  clearCanvas(c);
  for (var key in drawCalls) {
    drawCalls[key]();
  }
  drawCalls = [];
  c.strokeStyle = '#000';
  arc.stroke(c);
};

scene.step = function () {
  arc.step(arc.stepAmount);
  this.draw();
};

/*------------------------------------------------------------*/

var mousePos = canvasMousePos(canvas);

var afterComma = 3;
var cropNum = cropNumAt(afterComma);

var sliderStart = document.getElementById('sliderStart');
var sliderStartView = document.getElementById('sliderStartView');
var sliderEnd = document.getElementById('sliderEnd');
var sliderEndView = document.getElementById('sliderEndView');

arc.onchange = function updateView() {
  var view = document.getElementById('arcView');
  view.getElementsByClassName('start')[0].textContent = cropNum(this.start);
  view.getElementsByClassName('end')[0].textContent = cropNum(this.end);
};

function updateViews() {
  sliderStartView.textContent = cropNum(arc.start);
  sliderEndView.textContent = cropNum(arc.end);
}

var arcUpdateTimeInput = document.getElementsByClassName('arcUpdateTime')[0];

function fpsToMs(fps) {
  return fps ? 1000 / fps : fps;
}

Object.defineProperty(arc, 'updateTime', {
  get: function get() {
    return fpsToMs(Number(arcUpdateTimeInput.value));
  }
});
Object.defineProperty(arc, 'stepAmount', {
  get: function get() {
    return Number(document.getElementsByClassName('arcUpdateStep')[0].value);
  }
});
var arcUpdateInterval;
var turnOnArcUpdate = function turnOnArcUpdate(timeInterval) {
  if (arcUpdateInterval) {
    clearInterval(arcUpdateInterval);
  }
  if (timeInterval) {
    arcUpdateInterval = setInterval(function () {
      scene.step();
    }, timeInterval);
  }
};
var turnOffArcUpdate = function turnOffArcUpdate() {
  clearInterval(arcUpdateInterval);
  arcUpdateInterval = undefined;
};

var toggleArcUpdate = function toggleArcUpdate(timeInterval) {
  if (arcUpdateInterval) {
    turnOffArcUpdate();
  } else {
    turnOnArcUpdate(timeInterval);
  }
};
toggleArcUpdate(arc.updateTime);

function sliderChangeListener(e) {
  clearInterval(arcUpdateInterval);

  var slider = e.target;

  var val = slider.value / Math.pow(10, afterComma);
  var propName = slider.dataset['prop'];

  arc[propName] = val;

  var view = slider.parentElement.getElementsByClassName('view')[0];
  view.textContent = val;
  scene.draw();
}

sliderStart.addEventListener('input', sliderChangeListener);
sliderEnd.addEventListener('input', sliderChangeListener);

sliderStart.addEventListener('change', function () {
  turnOnArcUpdate(arc.updateTime);
});
sliderEnd.addEventListener('change', function () {
  turnOnArcUpdate(arc.updateTime);
});

arcUpdateTimeInput.addEventListener('change', function () {
  if (arc.updateTime) {
    turnOnArcUpdate(arc.updateTime);
  } else {
    turnOffArcUpdate();
  }
});

var fixedCenter = arc.center;
canvas.addEventListener('click', function (e) {
  fixedCenter = mousePos(e);
  if (!arcUpdateInterval) {
    arc.center = fixedCenter;
    arc.calculateRadius();
    scene.draw();
  }
});
canvas.addEventListener('mousemove', function (e) {
  var pos = mousePos(e);
  arc.center = pos;
  //drawCalls['mousemoveCross'] = () => {
  //  c.beginPath();
  //  drawCross(c, 10, pos, false);
  //  c.strokeStyle = '#f00';
  //  c.stroke();
  //};
});
canvas.addEventListener('mouseleave', function (e) {
  arc.center = fixedCenter;
});
//# sourceMappingURL=sourcemaps/main.js.map
