const googleMaps = require('@google/maps'),
      mongoClient = require('mongodb').MongoClient

const env = process.env.NODE_ENV || 'development'
var config = {}

try {
  config = require('./config.json')[env]
} catch(err) {
  config = {
    gmapsKey:  process.env.GMAPS_KEY,
    dbUri:     process.env.MONGODB_URI,
    jwksUri:   process.env.JWKS_URI,
    issuer:    process.env.AUTH_ISSUER,
    audience:  process.env.AUTH_AUDIENCE,
    roleKey:   process.env.AUTH_ROLE_KEY
  }
}

if(!config.gmapsKey && !config.dbUri && !config.jwksUri) {
  throw "could not find either config.json file, nor appropriate environment variables"
}

module.exports = config
