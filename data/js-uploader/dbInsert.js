const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./output.json')
}),
      { MongoClient, ObjectID } = require('mongodb')

var locationSet = [],
    orgMetaSet  = [],
    partialLocationSet = []

function insertSets() {
  MongoClient.connect("mongodbUri", { useNewUrlParser: true })
    .catch(err => console.log(err))
    .then(client => {
      console.log('Attempting to insert Data:\n')
      client.db().collection('OrgMetas').insertMany(orgMetaSet)
        .catch(err => console.log(err))
        .then(_ => {
          console.log('Finished inserting OrgMetas Set')
          return client.db().collection('Locations').insertMany(locationSet)
        })
        .catch(err => console.log(err))
        .then(_ => {
          console.log('Finished inserting Locations Set')
          return client.db().collection('PartialLocations').insertMany(partialLocationSet)
        })
        .catch(err => console.log(err))
        .then(_ => {
          console.log('Finished inserting PartialLocations Set')
          client.close()
        })
    })
}

lineReader.on('line', line => {
  var entry = JSON.parse(line),
      firstId = new ObjectID,
      secondId = new ObjectID

  if(entry['location']) {
    entry.location['_id'] = firstId
    entry.orgMeta['_id'] = secondId
    entry.location.orgMetaId = secondId
    entry.orgMeta.locations = [firstId]

    locationSet.push(entry.location)
    orgMetaSet.push(entry.orgMeta)
  } else {
    entry.partial['_id'] = firstId
    entry.orgMeta['_id'] = secondId
    entry.partial.orgMetaId = secondId
    entry.orgMeta.partialLocations = [firstId]

    partialLocationSet.push(entry.partial)
    orgMetaSet.push(entry.orgMeta)
  }
})

lineReader.on('close', _ => {
  console.log('\nFinished Loading document sets\n')
  console.log('OrgMetaSet length: ', orgMetaSet.length)
  console.log('LocationSet length: ', locationSet.length)
  console.log('PartialSet length: ', partialLocationSet.length)
  insertSets()
})
