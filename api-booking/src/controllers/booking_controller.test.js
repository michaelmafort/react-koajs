const request = require('supertest');
const { Booking } = require('../models/booking');
const app = require('../../app');

test('Success adding new Booking', async () => {
    const booking = {
        arrivalAt: "2022-06-08T18:00:00",
        name: "Michael Mafort",
        email: "michaelmafort@gmail.com",
        phone: "(11) 96375-6296",
        people: "7"
    };
    jest.spyOn(Booking, 'create')
        .mockReturnValueOnce({ ...booking, _id: "xhsyqtttysjahsgdgdtta" });
    const response = await request(app.callback())
        .post('/restaurant/629969290ea3b264f4032297/booking/add')
        .send(booking);
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toMatchObject({_id: expect.any(String)});
});

test('Validation fail adding new Booking', async () => {
    const booking = {
        arrivalAt: "2022-06-08T18:00:00",
        name: "Michael Mafort",
        email: "michaelmafort",//wrong email format
        phone: "(11) 96375-6296",
        people: "7"
    };
    const response = await request(app.callback())
        .post('/restaurant/629969290ea3b264f4032297/booking/add')
        .send(booking);
    expect(response.status).toBe(400);
    expect(response.text).toBe("{\"data\":[{\"field\":\"email\",\"message\":\"A valid e-mail address is required.\"}],\"error\":true,\"errorType\":\"ValidationError\"}");

});

afterEach(() => {
    jest.restoreAllMocks();
})

