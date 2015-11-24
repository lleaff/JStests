/*global $, R*/

function createCanvas() {
  var canvas = $('<canvas>', {
    id: 'mainCanvas'
  }).css({
    'width'            : '100%',
    'height'           : '100%',
    'max-width'        : '50rem',
    'max-height'       : '25rem',
    'border'           : '1px solid #aaaaaa'
  });
  return canvas;
}

/*------------------------------------------------------------*/

var canvas = createCanvas().appendTo('body');

var c = canvas[0].getContext('2d');

c.fillStyle = 'rgba(200, 255, 170, 0.8)';

c.fillRect(10, 10, 80, 80);
