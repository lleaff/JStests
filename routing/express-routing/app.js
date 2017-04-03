const express = require('express');
const app = express();

app.get('/favicon.ico', (req, res) => {
  res.send('');
})

app.use('*', (req, res, next) => {
  console.log(`------------------------------
    originalUrl: ${req.originalUrl}
    referer: ${req.headers.referer}`);
  next();
});

app.use('/foobar', (req, res, next) => {
  console.log(`use: /foobar`);
  next();
});

app.get('/foobar', (req, res, next) => {
  console.log(`route: /foobar`);
  next();
});

app.get('*', (req, res, next) => {
  console.log(`route: *`);
  res.send('nothing');
});

const port = 3000;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });
