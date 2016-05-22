export default function fetchImage(url) {
  return fetch(url)
    .then(res => res.blob())
    .then(blob => Promise.resolve(createImageBitmap(blob)));
}
