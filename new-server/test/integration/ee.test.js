const request = require('supertest'),
      assert = require('assert'),
      app = require('../../src/server')

describe('Location routes', () => {
  var temp = {}

  it('should create a new location', (done) => {
    request(app)
      .post('/api/location')
      .send({
        name: 'GoodWill',
        description: 'Distributing donated items',
        address: '2486 Baseline Rd, Boulder, CO 80305'
      })
      .then(({ body }) => {
        assert(!!body._id, true)
        assert(body.addressComponents.streetNumber, '2486')
        temp.id = body._id
        done()
      })
      .catch(done)
  })

  it('should fetch the new location', (done) => {
    request(app)
      .get(`/api/location/${temp.id}`)
      .then(({ body, status }) => {
        assert(body._id, temp.id)
        assert(body.name, 'GoodWill')
        assert(body.addressComponents.streetNumber, '2486')
        done()
      })
      .catch(done)
  })

  it('should fetch collection of locations', (done) => {
    request(app)
      .get('/api/location')
      .then(({ body }) => {
        assert((typeof body), Array)
        assert(body.length, 1)
        done()
      })
      .catch(done)
  })

  // it('should update location')

  it('should delete location', (done) => {
    request(app)
      .delete(`/api/location/${temp.id}`)
      .expect(200)
      .end((err, res) => done())
  })
})
