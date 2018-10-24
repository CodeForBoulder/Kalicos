const Joi = require('joi')

module.exports = class Valid {
  // Location related schema functions
  static locationIndexQuery(query) {
    var validators = {
      address:  Joi.string(),
      geo:      Joi.array().ordered(Joi.number(), Joi.number()),
      distance: Joi.number(),
      tags:     Joi.array().items(Joi.string())
    }
    Object.keys(query)
  }
}
