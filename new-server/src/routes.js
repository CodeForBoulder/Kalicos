const LocationController = require('./controllers/location'),
      OrgMetaController = require('./controllers/orgMeta'),
      PartialLocationController = require('./controllers/partialLocation'),
      jwks = require('jwks-rsa'),
      jwt = require('express-jwt'),
      { jwksUri, issuer, audience, roleKey } = require('./config')

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksUri
  }),

  // Validate the audience and the issuer.
  audience: audience,
  issuer: issuer,
  algorithms: ['RS256']
})

function checkAdmin(req, res, next) {
  if(req.user) {
    var roles = req.user[roleKey]
    if(roles.includes('admin')) {
      next()
    } else {
      next({
        status: 401,
        message: 'Lack Authorization'
      })
    }
  } else {
    next({
      status: 500,
      message: 'route did not decode access token'
    })
  }
}

module.exports = (app) => {
  app.get(   '/api/location',     LocationController.index)
  app.get(   '/api/location/:id', LocationController.get)
  app.post(  '/api/location',     LocationController.create)
  app.put(   '/api/location/:id', LocationController.update)
  app.delete('/api/location/:id', LocationController.delete)

  app.get(   '/api/orgMeta',      OrgMetaController.index)
  app.get(   '/api/orgMeta/:id',  OrgMetaController.get)

  app.get(   '/api/partialLocation',    PartialLocationController.index)
  app.get(   '/api/paritalLocation/:id', PartialLocationController.get)
}
