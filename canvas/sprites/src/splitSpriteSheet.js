/**
 * Split an image of equally sized sprites into separate images.
 *
 * @param {CanvasImageSource} image
 * @param {Object} [o] - Options: {
 *                         {Number} count,
 *                         {Number} gutter
 *                       }
 * @return {Promise<ImageBitmap[]>}
 */
export default function splitSpriteSheet(image, spriteWidth, spriteHeight, o = {}) {
  if (typeof o.gutter !== 'number') { o.gutter = 0 }

  return createImageBitmap(image)
    .then(img => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      let imagePromises = [];
      let x = 0;
      let y = 0;
      for (let i = 0; o.count === undefined || i < o.count; i++) {
        if (y >= imgHeight) {
          if (o.count === undefined && i < o.count) {
            throw new Error(`splitSpriteSheet: Invalid sprite arguments: spriteWidth: ${spriteWidth}, spriteHeight: ${spriteHeight}, count: ${o.count}, gutter: ${o.gutter}, given image dimensions (${imgWidth}x${imgHeight}).`);
          }
          break;
        }
        imagePromises[i] = createImageBitmap(img,
                                             x, y,
                                             spriteWidth, spriteHeight);
        x += spriteWidth + o.gutter;
        if (x >= imgWidth) {
          y += spriteHeight;
          x = 0;
        }
      }
      return Promise.all(imagePromises);
  });
}
