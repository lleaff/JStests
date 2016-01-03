/*global R*/
Object.assign(window, R);

/* =OO utils
 *------------------------------------------------------------*/

var mergeWithThis = curry(function(fn, other) {
  return mergeWith(fn, this, other);
});

function mkClass(constructorFn, prototypeObj) {
  constructorFn.prototype = prototypeObj;
  function factory() {
    return new (Function.prototype.bind.apply(
      constructorFn,
      [constructorFn].concat(Array.prototype.slice.call(arguments))));
  }
  factory._class = constructorFn;
  return factory;
};

/*------------------------------------------------------------*/

var IO = {};

IO.getWindowWidth  = () => window.innerWidth;
IO.getWindowHeight = () => window.innerHeight;

var W = IO.getWindowWidth();
var H = IO.getWindowHeight();

IO.updateCanvasDimensions = (canvas) => {
  canvas.setAttribute('width', IO.getWindowWidth());
  canvas.setAttribute('height', IO.getWindowHeight());
};

IO.setUpPage = (canvas) => {
  document.body.style.margin = 0;
  document.body.style.padding = 0;

  IO.updateCanvasDimensions(canvas);
};

/*------------------------------------------------------------*/

var vec = mkClass(
  function Vec(x, y) {
    this.x = x;
    this.y = y;
  },
  {
    add: mergeWithThis(add),
    mult: mergeWithThis(multiply)
  }
);

/* =Execution
 *------------------------------------------------------------*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

IO.setUpPage(canvas);
window.addEventListener('resize', IO.updateCanvasDimensions.bind(IO, canvas));
