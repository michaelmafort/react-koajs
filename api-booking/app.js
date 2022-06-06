const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Logger = require('koa-logger');
const { route } = require('./src/router');

const app = new Koa();

if (process.env.NODE_ENV !== 'test') {
    app.use(Logger());
}
app.use(cors());
app.use(koaBody());
app.use(route.routes());
app.use(route.allowedMethods());

module.exports = app;