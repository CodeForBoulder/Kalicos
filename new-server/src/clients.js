const Gmaps = require('./utils/gmaps'),
      Db    = require('./utils/db')

module.exports = {
  gmaps: (new Gmaps),
  db:    (new Db)
}
