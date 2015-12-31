/*global R*/
Object.assign(window, R);

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

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  map(f) {
    return new Vec(f(this.x), f(this.y));
  }
  mapVec(f, vec) {
    return new Vec(f(this.x, vec.x), f(this.y, vec.y));
  }

  add(vec) {
    return this.mapVec(add, vec);
  }
  mult(vec) {
    return this.mapVec(mult, vec);
  }
}

/* =Execution
 *------------------------------------------------------------*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

IO.setUpPage(canvas);
window.addEventListener('resize', IO.updateCanvasDimensions.bind(IO, canvas));
