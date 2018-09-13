const { ObjectID } = require('mongodb')

const Organizations = require('../models/organizationModel')

// seed data from spreadsheet
const seedOrganizations = [
  {
    _id:   new ObjectID(),
    name:  'CU Heritage Center',
    org_type: 'EDUCATIONAL',
    description: 'The Heritage Center at the University of Colorado of Boulder presents the history of the CU Boulder campus and its alumni. We are located on the third floor of Old Main and are operated by the CU Boulder Alumni Association.',
    latLng: {
      type: 'Point',
      coordinates: [ -105.2733468, 40.0092355 ]
    },
    address: '6672 Gunpark Dr, Boulder, CO 80301',
    isAccepted: true
  },
  {
    _id:   new ObjectID(),
    name:  'Boulder Public Library',
    org_type: 'EDUCATIONAL',
    description: 'The mission of the Boulder Public Library is to enhance the personal and professional growth of Boulder residents and contribute to the development and sustainability of an engaged community through free access to ideas, information, cultural experiences and educational opportunities.',
    latLng: {
      type: 'Point',
      coordinates: [ -105.281769, 40.013952 ]
    },
    address: '1001 Arapahoe Ave, Boulder, CO, 80302',
    isAccepted: true
  },
  {
    _id:   new ObjectID(),
    name: 'Flatirons Habitat for Humanity',
    org_type: 'NONPROFIT',
    description: 'Building strength, stability and self-reliance AND shelter. People in our community and all over the world partner with Habitat for Humanity to build or improve a place they can call home. Habitat homeowners help build their houses alongside volunteers and pay an affordable mortgage.',
    latLng: {
      type: 'Point',
      coordinates: [ -105.0890096, 39.9984502 ]
    },
    address: '6672 Gunpark Drive, Boulder, CO, 80302',
    isAccepted: true
  },
  {
    _id:   new ObjectID(),
    name: 'Haoway',
    org_type: 'NONPROFIT',
    description: 'It\'s Haoway!.',
    latLng: {
      type: 'Point',
      coordinates: [ -105.2526285, 40.0163854 ]
    },
    address: '1678 30th St, Boulder, CO 80301',
    isAccepted: false
  }
]

const populateOrganizations = async (done) => {
  if(await Organizations.countDocuments().exec() <= seedOrganizations.length) {
    Organizations
      .remove({})
      .then(() => {
        const addOrganizations = []

        seedOrganizations.forEach(organization => {
          addOrganizations.push(new Organizations(organization).save())
        })

        return Promise.all(addOrganizations)
      })
    console.log('POPULATED ORGANIZATIONS')
  } else {
    console.log('ORGANIZATIONS ALREADY POPULATED')
  }
}

module.exports = {
  seedOrganizations,
  populateOrganizations
}
