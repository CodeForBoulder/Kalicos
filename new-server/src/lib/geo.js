const axios = require('axios'),
      _     = require('lodash/fp'),
      { gmapsKey } = require('../config')

module.exports = class Geo {
  // implicitly there is a 2.5k/day rate limit
  // but we can address it later
  // I need to cache address searches that I have already done
  static fetch(address) {
    return new Promise((resolve, reject) => {
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=' + gmapsKey,
                { params: { address: address }})
        .catch(err => reject(new Error(err)))
        .then(resp => {
          if(resp.data.error_message) {
            reject(new Error(resp.data.error_message))
          } else {
            resolve(resp.data.results[0])
          }
        })
    })
  }

  static addToQuery(coords, query) {
    var maybeDefault = query.distance ? parseInt(query.distance) : 5,
        geoPart = {
          latLng: {
            $geoWithin: {
              $centerSphere: [[coords.lng, coords.lat], maybeDefault / 3963.2]
            }
          }
        }
    return _.flow([_.omit(['address', 'zipcode', 'distance']), _.assign(geoPart)])(query)
  }
}
