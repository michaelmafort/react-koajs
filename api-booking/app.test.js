const request = require('supertest');
const app = require('./app');

test('server alive?', async () => {
    const response = await request(await app.callback()).get('/').send();
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server alive!');
});



