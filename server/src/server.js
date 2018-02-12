const bodyParser = require('body-parser')
const cors       = require('cors')
const express    = require('express')
const helmet     = require('helmet')
const logger     = require('morgan')
const fs         = require('fs')
const path       = require('path')
const passport   = require('passport')
const session    = require('express-session')

const app = express()

// load custom .env variables
require('./config/config')
const isDevEnv = process.env.NODE_ENV === 'development'

// load db config
const mongoose = require('./db/mongoose')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

if(isDevEnv) {
  db.once('open', () => {
    console.log('db connected successfully')
    require('./seed/organizationSeed').populateOrganizations()
    require('./seed/userSeed').populateUsers()
  })
}

require('./config/passport')(passport)

// load middleware
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

if(isDevEnv) {
  app.use(logger('dev'))
}

if(process.env.NODE_ENV === 'production') {
  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
  app.use(logger('combined', {stream: accessLogStream}))
}

// attach routes to app
require('./routes')(app)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  if(isDevEnv) {
    console.log(`server listening on http://localhost:${PORT}`)
  }
})

// app export is for integration testing
module.exports = app
