const express = require('express');
const app = express();

app.get('/favicon.ico', (req, res) => {
  res.send('');
})

app.route = [];

const { logRoute, logUse } = (() => {
  function _logRouting(type, res, route) {
    const log = `${type}(${route})`;
    res.locals.route = [
      ...(Array.isArray(res.locals.route) ?  res.locals.route : []),
      log
    ];
  }
  return {
    logRoute(route) {
      return _logRouting('route', this, route);
    },
    logUse(route) {
      return _logRouting('use', this, route);
    }
  };
})();

app.use('*', (req, res, next) => {
  const oldSend = res.send;
  res.send = function patchedSend(...args) {
    console.log('route: ', res.locals.route.map(r => `${r}`).join(' -> '));
    return oldSend.call(this, ...args);
  }

  res.logRoute = logRoute;
  res.logUse = logUse;

  console.log(`------------------------------`);
  console.log(`originalUrl: "${req.originalUrl}"`);
  console.log(`referer: ${req.headers.referer}`);
  next();
});

app.use('/foobar', (req, res, next) => {
  res.logUse('/foobar');
  next();
});

app.get('/foobar', (req, res, next) => {
  res.logRoute('/foobar');
  next();
});

app.get('*', (req, res, next) => {
  res.logRoute('*');
  res.send('nothing');
});

const port = 3000;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });
