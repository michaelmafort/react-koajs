const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    restaurant: String,
    arrivalAt: Date,
    name: String,
    email: {
        type: String,
        validate: {
            validator: (email) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: 'A valid e-mail address is required.'
        }
    },
    phone: String,
    people: Number,
    status: {
        type: String,
        enum: {
            values: ['QUEUED', 'WAITING', 'INSIDE', 'CANCELED'],
            message: '{VALUE} isn`t a valid status.',
        }
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

const statuses = {
    QUEUED: 'QUEUED',
    WAITING: 'WAITING',
    INSIDE: 'INSIDE',
    CANCELED: 'CANCELED'
}

module.exports = {
    Booking,
    statuses,
};