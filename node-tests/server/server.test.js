const request = require('supertest');
const { app } = require('./server');
const expect = require('expect');

describe('Server', () => {

    describe('/GET', () => {
        it('response of express calls', (done) => {
            request(app)
                .get('/')
                .expect((res) => {
                    expect(res.body).toInclude({ value: 1 });
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        })
    });

    describe('/Users', () => {
        it('response of users express call', (done) => {
            request(app)
                .get('/users')
                .expect((res) => {
                    expect(res.body).toInclude({ name: 'Muthu', age: 26 });
                    expect(res.body).toBeA('array');
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        })
    });
});