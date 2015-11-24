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

var getCss = R.invoker(1, 'css');
var setCss = R.invoker(2, 'css');

var getAttr = R.invoker(1, 'attr');
var setAttr = R.invoker(2, 'attr');

var width = getCss('width');

/*------------------------------------------------------------*/

var canvas = init();
