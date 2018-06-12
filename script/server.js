const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
app.use(serve(path.join(process.env.PWD, '/dist')));

// this last koa middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
app.use(function* index() {
  yield send(this, '/dist/index.html');
});

// don't listen to this port if the app is required from a test script
if (!module.parent) {
  app.listen(process.env.PORT || 1337);
  console.log('app listen on port: 1337');
}
