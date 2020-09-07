const assert = require('assert');
const request = require('supertest');
const app = require('../index');

it('should login', (done) => {
    request(app)
    .get('/api/feed/1/10')
    .expect((response) => {
        assert.equal(response.body.data.meta, 'ok');
    })
    .end(done);
});