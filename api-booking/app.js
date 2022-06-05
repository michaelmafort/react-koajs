const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Logger = require('koa-logger');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();

if (process.env.NODE_ENV !== 'test') {
    app.use(Logger());
}
app.use(cors());
app.use(koaBody());

const route = router.get('/', async (ctx) => {
    ctx.body = 'Server alive!';
});

app.use(route.routes());
app.use(route.allowedMethods());

module.exports = app;