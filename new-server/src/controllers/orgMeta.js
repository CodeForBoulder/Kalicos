const OrgMeta = require('../models/orgMeta'),
      { gmaps, db } = require('../clients')

module.exports = class OrgMetaController {
  static index({ body }, res) {
    db.direct().collection(OrgMeta.documentName())
      .find(modQuery).toArray()
      .then(data => res.send(data))
      .catch(err => res.sendStatus(500))
  }

  static get(req, res) {
    db.direct().collection(OrgMeta.documentName())
      .findOne({ _id: db.objectId(req.params.id) })
      .catch(err => res.sendStatus(404))
      .then(data => res.send(data))
  }
}
