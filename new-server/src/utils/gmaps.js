const googleMaps = require('@google/maps'),
      { gmapsKey } = require('../config'),
      axios = require('axios')

module.exports = class Gmaps {
  constructor() {
    this.client = googleMaps.createClient({
      key: gmapsKey,
      Promise: Promise
    })
  }

  // do not need an api key for our uses at the moment 2,500 request limit a day is plenty
  checkUrl(address) {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json',
                     { params: { address: address }})
  }

  fetchCoords(address) {
    console.log('I should have an address here:  ', address)
    this.client.geocode({ address: address }, (err, response) => {
      if (!err) {
        console.log('succeeded with response: ', JSON.stringify(response, 2))
      } else {
        console.log('flopped, for this reason: ', err)
      }
    })
    // return new Promise((resolve, reject) => {
    //   console.log('Does it get this far?')
    //   this.client.geocode({ address: address })
    //     .asPromise()
    //     .catch(err => {
    //       console.log('something went wrong')
    //       reject(err)
    //     })
    //     .then(response => {
    //       console.log('Hello, response is type: ', typeof response)
    //       console.log(JSON.stringify(response))
    //       // might pull in lodash to safely navigate deeply nested objects
    //       var results = response.json.results[0].geometry.location,
    //           coords = [ results.lat, results.lng ]
    //       resolve(coords)
    //     })
    // })
  }

  // Can be considered Janky, currently only one class needs this
  applyGeocode(obj) {
    if(!obj.supplyAddress && !obj.integrateGeocodingInfo) {
      throw "The object provided does not supply the methods 'supplyAddress' and 'integrateGeocodingInfo'"
    }

    return new Promise((resolve, reject) => {
      this.client.geocode({ address: obj.supplyAddress() })
        .asPromise()
        .catch(reject)
        .then(response => {
          obj.integrateGeocodingInfo(response.json.results[0])
          return resolve(obj)
        })
    })
  }
}
