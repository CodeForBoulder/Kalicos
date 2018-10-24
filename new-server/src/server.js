const express    = require('express'),
      bodyParser = require('body-parser'),
      cors       = require('cors')


var app = express()

app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(bodyParser.json())
require('./routes')(app)

app.listen(8080, () => console.log('Server started on port 8080'))

// for use in supertest integration testing
module.exports = app
