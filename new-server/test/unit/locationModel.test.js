const expect = require('chai').expect,
      Location = require('../../src/models/location')

describe('Location model', () => {
  const attributes = {
    name: 'GoodWill',
    description: 'Distributing donated items',
    address: '2486 Baseline Rd, Boulder, CO 80305'
  },
      result = {
        address_components:
        [ { long_name: '2486', short_name: '2486', types: ['street_number'] },
          { long_name: 'Baseline Road',
            short_name: 'Baseline Rd',
            types: ['route'] },
          { long_name: 'Martin Acres',
            short_name: 'Martin Acres',
            types: ['locality', 'political'] },
          { long_name: 'Boulder', short_name: 'Boulder', types: [Array] },
          { long_name: 'Boulder County',
            short_name: 'Boulder County',
            types: ['administrative_area_2', 'political'] },
          { long_name: 'Colorado', short_name: 'CO', types: ['administrative_area_1', 'political'] },
          { long_name: 'United States', short_name: 'US', types: ['country', 'political'] },
          { long_name: '80305', short_name: '80305', types: ['postal_code'] },
          { long_name: '3323', short_name: '3323', types: ['foobar?'] } ],
        formatted_address: '2486 Baseline Rd, Boulder, CO 80305, USA',
        geometry: {
          location: { lat: 39.9985042, lng: -105.2618961 },
          location_type: 'ROOFTOP',
          viewport: { northeast: [Object], southwest: [Object] }
        },
        place_id: 'ChIJScgvRrTta4cRGBgvs7vpRHw',
        plus_code: {
          compound_code: 'XPXQ+C6 Boulder, Colorado, United States',
          global_code: '85FPXPXQ+C6' },
        types: [ 'street_address' ]
      }

  it('should create a simple object', () => {
    var location = new Location(attributes)
    expect(location.data.name).to.equal('GoodWill')
  })

  it('should ensure validation works on new', () => {
    var missingAddress = { name: attributes.name, descrition: attributes.description },
        location = new Location(missingAddress)

    expect(location.error).to.not.equal(null)
  })

  it('should update schema when provided goecoding data', () => {
    var location = new Location(attributes)

    const coords = location.integrateGeocodingInfo(result).data.latLng.coordinates
    expect(coords[0]).to.equal(39.9985042)
    expect(Location.documentName()).to.equal('Locations')
  })

  it('should provide the correct information when asked to exposeData', () => {
    var location = new Location(attributes)

    expect(location.exposeData()).to.deep.equal({
      document: Location.documentName(),
      payload: attributes
    })
  })

  it('Should filter/tanslate search terms mongodb consumable object', () => {
    // geospacial search based on supplied zipcode?
    // or supply based on browser supplied geolocation
  })

  it('Should distiguish between different searches', () => {
    var addr = { address: 'stub', distance: 5 },
        geo  = { coords: [4, 5], distance: 2 },
        wrong = { foo: 'bar' }

    expect(Location.queryType(addr)).to.equal('addr')
    expect(Location.queryType(geo)).to.equal('geo')
    expect(Location.queryType(wrong)).to.equal('unsupported')
  })

  it('Should create geo search object', () => {
    var query = Location.geoQuery([4,3], 4),
        query2 = Location.geoQuery([4,3], null)

    expect(query).to.deep.equal({
      latLng: {
        $geoWithin: {
          $centerSphere: [[4,3], 4 / 3963.2]
        }
      }
    })
    expect(query2).to.deep.equal({
      latLng: {
        $geoWithin: {
          $centerSphere: [[4,3], 5 / 3963.2]
        }
      }
    })
  })

})
