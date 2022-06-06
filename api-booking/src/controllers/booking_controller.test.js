const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
let callback;

test('Success adding new Booking', async () => {
    const booking = {
        arrivalAt: "2022-06-08T18:00:00",
        name: "Michael Mafort",
        email: "michaelmafort@gmail.com",
        phone: "(11) 96375-6296",
        people: "7"
    };
    const response = await request(callback)
        .post('/restaurant/629969290ea3b264f4032297/booking/add')
        .send(booking);
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toMatchObject({_id: expect.any(String), email: 'michaelmafort@gmail.com'});
});

test('Validation fail adding new Booking', async () => {
    const booking = {
        arrivalAt: "2022-06-08T18:00:00",
        name: "Michael Mafort",
        email: "michaelmafort",//wrong email format
        phone: "(11) 96375-6296",
        people: "7"
    };
    const response = await request(callback)
        .post('/restaurant/629969290ea3b264f4032297/booking/add')
        .send(booking);
    expect(response.status).toBe(400);
    expect(response.text).toBe("{\"data\":[{\"field\":\"email\",\"message\":\"A valid e-mail address is required.\"}],\"error\":true,\"errorType\":\"ValidationError\"}");

});

test('List Bookings', async () => {
    const response = await request(callback).get('/restaurant/629969290ea3b264f4032297/booking');
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).length).toBe(1);

});

afterEach(() => {
    jest.restoreAllMocks();
});

beforeAll( async () => {
    await mongoose.connect(process.env.MONGODB_URI, {dbName: 'integration_test'});
    await mongoose.connection.db.dropDatabase();

    callback = await app.callback();
});

afterAll(() => {
    mongoose.disconnect();
});

