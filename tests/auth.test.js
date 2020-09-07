const assert = require('assert');
const request = require('supertest');
const app = require('../index');

it('should register user', (done) => {
    request(app)
    .post('/api/user/register')
    .send({
        email: 'test1@gmail.com',
        password: 'password',
        repeatPassword: 'password',
    })
    .expect((response) => {
        console.log(response.body);
        assert.equal(response.body.data.meta, 'User was successfully registered');
    })
    .end(done);
});

it('should login', (done) => {
    request(app)
    .post('/api/user/login')
    .send({
        email: 'test1@gmail.com',
        password: 'password',
    })
    .expect((response) => {
        assert.equal(response.body.data.meta, 'User was successfully logined');
    })
    .end(done);
});

it('should return error of email', (done) => {
    request(app)
    .post('/api/user/register')
    .send({
        email: 'test1',
        password: 'password',
        repeatPassword: 'password',
    })
    .expect((response) => {
        assert.equal(response.body.error.fields.email, 'WRONG_EMAIL');
    })
    .end(done);
});

it('should return error pass', (done) => {
    request(app)
    .post('/api/user/register')
    .send({
        email: 'test1@gmail.com',
        password: 'password',
        repeatPassword: 'passworsassad',
    })
    .expect((response) => {
        assert.equal(response.body.error.fields.repeatPassword, 'FIELDS_NOT_EQUAL');
    })
    .end(done);
});

it('should return error', (done) => {
    request(app)
    .post('/api/user/login')
    .send({
        email: 'test1@gmail.com',
        password: 'passwordssss',
    })
    .expect((response) => {
        assert.equal(response.body.error.fields.meta, 'Wrong data');
    })
    .end(done);
});