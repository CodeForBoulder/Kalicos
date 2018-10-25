const { MongoClient, ObjectID } = require('mongodb')

var codes = [
  {
    zipCode: '80304',
    coords: [-105.29647064, 40.04523087]
  },
  {
    zipCode: '80305',
    coords: [-105.25451660, 39.96939087]
  },
  {
    zipCode: '80303',
    coords: [-105.19924164, 39.96591949]
  },
  {
    zipCode: '80302',
    coords: [-105.38626862, 40.03947067]
  },
  {
    zipCode: '80301',
    coords: [-105.20584869, 40.05089951]
  }
]

MongoClient.connect("mongodbUri", { useNewUrlParser: true })
  .catch(err => console.log(err))
  .then(client => {
    client.db().collection('ZipCoords').insertMany(codes)
      .catch(err => {
        console.log(err)
        client.close()
      })
      .then(_ => {
        console.log('Succeeded inserting ZipCoords')
        client.close()
      })
  })
