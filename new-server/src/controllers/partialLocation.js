const PartialLocation = require('../models/partialLocation'),
      { gmaps, db } = require('../clients')

module.exports = class PartialLocationsController {
  static index({ body }, res) {
    db.direct().collection(PartialLocation.documentName())
      .find(modQuery).toArray()
      .then(data => res.send(data))
      .catch(err => res.sendStatus(500))
  }

  static get(req, res) {
    db.direct().collection(PartialLocation.documentName())
      .findOne({ _id: db.objectId(req.params.id) })
      .catch(err => res.sendStatus(404))
      .then(data => res.send(data))
  }
}
