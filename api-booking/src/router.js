const Router = require('koa-router');
const router = new Router();
const bookingController = require('./controllers/booking_controller');

const route = router.post('/restaurant/:restaurant_id/booking/add', bookingController.add);
route.get('/restaurant/:restaurant_id/booking', bookingController.list);
route.put('/restaurant/:restaurant_id/booking/:id/edit', bookingController.edit);

route.get('/', async (ctx) => {
    ctx.body = 'Server alive!';
})

module.exports = {
    route,
}