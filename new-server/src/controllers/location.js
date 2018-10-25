const Location = require('../models/location'),
      _ = require('lodash/fp'),
      Geo = require('../lib/geo'),
      { gmaps, db } = require('../clients')

module.exports = class LocationController {
  static async index({ query }, res, done) {
    // Going omit validation for now
    // adding zipcode as a possible param
    if(query.zipcode) {
      // will handle error later
      var zip = await db.fetch('ZipCoords', { zipCode: query.zipcode }),
          coords = { lng: zip[0].coords[0], lat: zip[0].coords[1] }
      query = Geo.addToQuery(coords, query)
    }

    if(query.address && !query.zipcode) {
      var result = await Geo.fetch(query.address),
        err = null
      if (err || result.data.status !== 'OK') {
        return res.status(500).send({ message: 'Nope, did not work' })
      }
      query = Geo.addToQuery(result.geometry.location, query)
    }

    db.fetch(Location.documentName(), query)
      .then(data => res.send(data))
      .catch(err => done(new Error(err)))
  }

  static get(req, res) {
    db.direct().collection(Location.documentName())
      .findOne({ _id: db.objectId(req.params.id) })
      .catch(err => res.sendStatus(404))
      .then(data => done(data))
  }

  static async create(req, res) {
    try {
      let location = new Location(req.body),
        geoResp = await Geo.fetch(location.supplyAddress())

      location.integrateGeocodingInfo(geoResp)

      let newLocation = await db.save(location.exposeData())
      res.send(newLocation)
    } catch(err) {
      console.error(err)
      res.sendStatus(500)
    }
  }

  static update(req, res) {

  }

  static delete(req, res) {
    db.direct().collection(Location.documentName())
      .findOneAndDelete({ _id: db.objectId(req.params.id) })
      .catch(err => res.sendStatus(403))
      .then(_ => res.sendStatus(200))
  }
}
