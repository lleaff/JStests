'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global R*/
Object.assign(window, R);

/*------------------------------------------------------------*/

var IO = {};

IO.getWindowWidth = function () {
  return window.innerWidth;
};
IO.getWindowHeight = function () {
  return window.innerHeight;
};

var W = IO.getWindowWidth();
var H = IO.getWindowHeight();

IO.updateCanvasDimensions = function (canvas) {
  canvas.setAttribute('width', IO.getWindowWidth());
  canvas.setAttribute('height', IO.getWindowHeight());
};

IO.setUpPage = function (canvas) {
  document.body.style.margin = 0;
  document.body.style.padding = 0;

  IO.updateCanvasDimensions(canvas);
};

/*------------------------------------------------------------*/

var Vec = (function () {
  function Vec(x, y) {
    _classCallCheck(this, Vec);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec, [{
    key: 'map',
    value: function map(f) {
      return new Vec(f(this.x), f(this.y));
    }
  }, {
    key: 'mapVec',
    value: function mapVec(f, vec) {
      return new Vec(f(this.x, vec.x), f(this.y, vec.y));
    }
  }, {
    key: 'add',
    value: (function (_add) {
      function add(_x) {
        return _add.apply(this, arguments);
      }

      add.toString = function () {
        return _add.toString();
      };

      return add;
    })(function (vec) {
      return this.mapVec(add, vec);
    })
  }, {
    key: 'mult',
    value: (function (_mult) {
      function mult(_x2) {
        return _mult.apply(this, arguments);
      }

      mult.toString = function () {
        return _mult.toString();
      };

      return mult;
    })(function (vec) {
      return this.mapVec(mult, vec);
    })
  }]);

  return Vec;
})();

/* =Execution
 *------------------------------------------------------------*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

IO.setUpPage(canvas);
window.addEventListener('resize', IO.updateCanvasDimensions.bind(IO, canvas));
//# sourceMappingURL=sourcemaps/main.js.map
