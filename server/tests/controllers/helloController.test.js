const request = require('supertest')
const expect  = require('chai').expect

const app = require('../../server')

describe('testing init', () => {
  describe('helloController', () => {
    it('should return the message \'hello and welcome to the Kalicos rest server!\' at /hello route', (done) => {
      request(app)
        .get('/hello')
        .expect(200)
        .expect(res => expect(res.body).to.eql({ welcome: 'hello and welcome to the Kalicos rest server!' }))
        .end(done)
    })
  })
})
