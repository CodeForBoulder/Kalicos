const Joi = require('joi')

module.exports = class Location {
  constructor(args) {
    this.data = args
  }

  static documentName() {
    return 'Locations'
  }

  static geoQuery(coords, distance) {
    var maybeDefault = distance ? distance : 5
    return {
      latLng: {
        $geoWithin: {
          $centerSphere: [coords, maybeDefault / 3963.2]
        }
      }
    }
  }

  static queryType(query) {
    var addrSchema = Joi.object().keys({
      address: Joi.string().required(),
      distance: Joi.number()
    })

    var geoSchema = Joi.object().keys({
      coords: Joi.array().ordered(Joi.number(), Joi.number()).required(),
      distance: Joi.number()
    })

    if (!Joi.validate(query, addrSchema).error) return 'addr'
    if (!Joi.validate(query, geoSchema).error) return 'geo'
    if (Object.keys(query).length > 0) return 'unsupported'
  }

  static filterUpdateKeys(query) {
    // upate keys
    return 'stub'
  }

  validate() {
    return Joi.validate(this.data, this.schema)
  }

  coordinateStruct(coords) {
    return {
      type: 'Point',
      coordinates: [ coords.lng, coords.lat ]
    }
  }

  partTranslation() {
    return {
      street_number: 'streetNumber',
      route: 'route',
      locality: 'locality',
      administrative_area_level_1: 'state',
      country: 'country',
      postal_code: 'postalCode'
    }
  }

  generateGeocodeStruct(locationInfo) {
    var addressComponents = {}
    console.log('What do I have: ', locationInfo)
    locationInfo.address_components.map(addressPart => {
      addressPart.types.map(addressType => {
        if(this.partTranslation()[addressType]) {
          Object.assign(
            addressComponents,
            { [this.partTranslation()[addressType]]: addressPart.long_name }
          )
        }
      })
    })
    return {
      addressComponents: addressComponents,
      latLng: this.coordinateStruct(locationInfo.geometry.location)
    }
  }

  supplyAddress() {
    return this.data.address
  }

  integrateGeocodingInfo(geoData) {
    Object.assign(this.data, this.generateGeocodeStruct(geoData))
    return this
  }

  exposeData() {
    return {
      document: Location.documentName(),
      payload: this.data
    }
  }
}
