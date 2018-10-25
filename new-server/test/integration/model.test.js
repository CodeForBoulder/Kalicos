const expect = require('chai').expect,
      Location = require('../../src/models/location'),
      { gmaps, db } = require('../../src/clients')

describe('Location model integration', () => {

  it('should update geocode and save', (done) => {
    var location = new Location({
      name: 'NCAR',
      description: 'National Center for Atmospheric Research',
      address: '1850 Table Mesa Dr, Boulder, CO 80305'
    }), errFn = err => {
      db.close()
      done(err)
    }

    gmaps.applyGeocode(location)
      .catch(errFn)
      .then(l => {
        expect(l.data.addressComponents.streetNumber).to.equal('1850')
        return db.save(l.exposeData())
      })
      .catch(errFn)
      .then(data => {
        expect(data._id).to.not.equal(null)
        db.close()
        done()
      })
  })
})
