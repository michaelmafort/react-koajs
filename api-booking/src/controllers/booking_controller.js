const { Booking, statuses } = require('../models/booking');
const { throwValidationFailResponse, throwUpdatedFailResponse } = require('../helpers/response_helpers');

const add = async (ctx) => {
    const restaurant = ctx.params.restaurant_id;
    const arrivalAt = new Date(ctx.request.body.arrivalAt);
    const name = ctx.request.body.name;
    const email = ctx.request.body.email;
    const phone = ctx.request.body.phone;
    const people = ctx.request.body.people;

    const bookingData = {
        restaurant,
        arrivalAt,
        name,
        email,
        phone,
        people,
        status: statuses.QUEUED,
    };
    try{
        ctx.body = await Booking.create(bookingData);
    } catch(e) {
        throwValidationFailResponse(ctx, e);
    }
};

const list = async (ctx) => {
    try {
        ctx.body = await Booking
            .find({ restaurant: ctx.params.restaurant_id, arrivalAt: { $gte: new Date() } })
            .sort({ arrivalAt: 1 })
            .limit(50);
    } catch (e) {
        ctx.status = 500;
        ctx.throw('Server error!');
    }
};


module.exports = {
    add,
    list,
}