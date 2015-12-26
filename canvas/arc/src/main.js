var cropNumAt = function(at, num) {
  function cropNumAtAt(num) {
    return ((num * (Math.pow(10, at))) >>0) / Math.pow(10, at);
  }
  return num === undefined ? cropNumAtAt : cropNumAtAt(num);
};

var add  = function(x, y) {
  function addx(y) {
    return x + y;
  }
  return y === undefined ? addx : addx(y);
};
var mult  = function(x, y) {
  function multx(y) {
    return x * y;
  }
  return y === undefined ? multx : multx(y);
};
var div  = function(x, y) {
  function divx(y) {
    return x / y;
  }
  return y === undefined ? divx : divx(y);
};

function zipWithObj(f, a, b) {
  //console.log('f:', f, 'a:', a, 'b:', b);//DEBUG
  function zipWithObjF(a, b) {
    function zipWithObjFA(b) {
      var newObj = a.prototype ? Object.create(a.prototype) : {};
      Object.keys(a).forEach((key) => newObj[key] = f(a[key], b[key]));
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
        return ((x - lo) % range) + lo;
      } else if (x < lo) {
        return hi + ((x - lo) % range);
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
Vec2D.prototype.zipWith = function(f, v) {
  function zipWithF(v) {
    return new Vec2D(
      f(this.x, v.x),
      f(this.y, v.y)
    );
  }
  return v === undefined ? zipWithF : zipWithF(v);
};
Vec2D.prototype.add  = Vec2D.prototype.zipWith(add);
Vec2D.prototype.mult = Vec2D.prototype.zipWith(mult);
Vec2D.prototype.div  = Vec2D.prototype.zipWith(div);

Vec2D.prototype.moveTo = function(context) {
  (context || ctx).moveTo(this.x, this.y);
};
Vec2D.prototype.lineTo = function(context) {
  (context || ctx).lineTo(this.x, this.y);
};

function vec(x, y) { return new Vec2D(x, y); }

/*------------------------------------------------------------*/

class Path  {
  constructor() {
  }

  static stroke(ctx) {
    ctx.beginPath();
    ctx.moveTo(this[0]);
    this.forEach((v) => { v.lineTo(ctx); });
    ctx.stroke();
  }

  get baboon() {
    return 'BABOON';
  }
}

/*------------------------------------------------------------*/

function Line(a, b) {
  this[0] = a;
  this[1] = b;
}
Object.defineProperty(Line.prototype, 'a', {
  get: function() { return this[0]; },
  set: function(val) { this[0] = val; }
});
Object.defineProperty(Line.prototype, 'b', {
  get: function() { return this[1]; },
  set: function(val) { this[1] = val; }
});
function line(a, b) {
  return new Line(a, b);
}

/*------------------------------------------------------------*/

var wrapRadian = wrap(0, Math.PI * 2);

class Arc {
  constructor(center, radius, start = 0, end = Math.PI * 2) {
    this.center = center;
    this.radius = radius;
    this.start = start;
    this.end = end;
  }

  get start() { return this._start; }
  set start(rad) {
    this._start = wrapRadian(rad);
    this.onchange();
  }

  get end() { return this._end; }
  set end(rad) {
    this._end = wrapRadian(rad);
    this.onchange();
  }

  mapStartEnd(f) {
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

    if ((start > end) != orientation) {
      this._start = end;
      this._end = start;
    } else {
      this._start = startWrapped;
      this._end = endWrapped;
    }
    this.onchange();
  }

  draw(ctx = ctx) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, this.start, this.end);
  }

  stroke(ctx = ctx) {
    this.draw(ctx);
    ctx.stroke();
  }

  onchange() {
  }
}

/*------------------------------------------------------------*/

function clearCanvas(ctx = ctx) {
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
  return Math.min(Math.abs(rectangle[0].x - point.x),
                  Math.abs(rectangle[0].y - point.y),
                  Math.abs(rectangle[1].x - point.x),
                  Math.abs(rectangle[1].y - point.y));
}

function drawMyArc(center, radius) {
  c.beginPath();
  c.arc(center.x, center.y,
        p(radius, 100),
        pc(0), pc(75));
  c.stroke();
}

var arc = new Arc(vec(pw(50), ph(50)), 0, pc(80), pc(90));

arc.step = function(rad) {
  var maxContainedRadius = closestDistanceFromRectangleSide(line(vec(0,0), vec(W,H)), this.center) - 2;
  this.radius = maxContainedRadius;
  this.mapStartEnd(add(rad));
};

/*------------------------------------------------------------*/

var arcStep = 0.1;

var scene = {};

scene.draw = function() {
  clearCanvas(c);
  arc.stroke(c);
};

scene.step = function() {
  arc.step(arc.stepAmount);
  this.draw();
};


/*------------------------------------------------------------*/

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

Object.defineProperty(arc, 'updateTime', {
  get: function() {
    return Math.abs(Number(arcUpdateTimeInput.value));
  }
});
Object.defineProperty(arc, 'stepAmount', {
  get: function() {
    return Number(document.getElementsByClassName('arcUpdateStep')[0].value);
  }
});
var arcUpdateInterval;
var turnOnArcUpdate = function(timeInterval) {
  if (arcUpdateInterval) {
    clearInterval(arcUpdateInterval);
  }
  arcUpdateInterval = setInterval(function() {
    scene.step();
  }, (timeInterval));
};

var toggleArcUpdate = function(timeInterval) {
  if (arcUpdateInterval) {
    clearInterval(arcUpdateInterval);
    arcUpdateInterval = undefined;
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

canvas.addEventListener('click', function() {
  toggleArcUpdate(arc.updateTime);
});

arcUpdateTimeInput.addEventListener('change', function() {
  turnOnArcUpdate(arc.updateTime);
});
