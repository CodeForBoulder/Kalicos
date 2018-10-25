const { MongoClient, ObjectID } = require('mongodb'),
      _ = require('lodash/fp'),
      { dbUri } = require('../config')

module.exports = class Db {
  constructor() {
    MongoClient.connect(dbUri, { useNewUrlParser: true })
      .then(client => {
        this.client = client
        this.db = client.db()
      })
      .catch(err => { throw err })
  }

  fetch(collName, query) {
    if(query.page) {
      var start = parseInt(query.page) * 20,
          end = 20,
          modQ = _.omit(['page'], query)
      return this.db.collection(collName)
        .find(modQ)
        .skip(start)
        .limit(end)
        .toArray()
    }
    return this.db.collection(collName)
      .find(query).toArray()
  }

  objectId(id) {
    return new ObjectID(id)
  }

  direct() {
    return this.db
  }

  close() {
    return this.client.close()
  }

  save(obj) {
    return new Promise((resolve, reject) => {
      this.db.collection(obj.document).insertOne(obj.payload)
        .then(({ ops }) => resolve(ops[0]))
        .catch(err => reject(err))
    })
  }
}
