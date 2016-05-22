import splitSpriteSheet from './splitSpriteSheet';
import fetchImage from './fetchImage';

import {expect} from 'chai';

fetchImage('32x32_sprites.gif')
  .then(img => splitSpriteSheet(img, 32, 32))
  .then(sprites => {
    try {
      sprites.forEach(sprite => {
        expect(sprite.width).to.equal(32);
        expect(sprite.height).to.equal(32);
      });
      expect(sprites.length).to.equal(96);
    } catch(e) {
      console.error(e);
    }

    const container = document.getElementById('app');
    sprites.forEach((sprite, i) => {
      let canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      canvas.className = 'sprite';
      let ctx = canvas.getContext('2d');
      ctx.drawImage(sprite, 0, 0);
      container.appendChild(canvas);
    });
  });
