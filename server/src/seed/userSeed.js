const { ObjectID } = require('mongodb')

const bCrypt   = require('bcrypt-nodejs')
const Users = require('../models/userModel')

const hashPassword = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
}

const seedUsers = [
  {
    _id:   new ObjectID(),
    email: 'john@email.com',
    username:  'john',
    password: hashPassword('john'),
    accessLevel: 'standard'
  },
  {
    _id:   new ObjectID(),
    email: 'test@email.com',
    username:  'test',
    password: hashPassword('123'),
    accessLevel: 'admin'
  }
]

const populateUsers = async (done) => {
  if(await Users.countDocuments().exec() <= seedUsers.length) {
    Users
      .remove({})
      .then(() => {
        const addUsers = []

        seedUsers.forEach(user => {
          addUsers.push(new Users(user).save())
        })

        return Promise.all(addUsers)
      })
    console.log('POPULATED USERS')
  } else {
    console.log('USERS ALREADY POPULATED')
  }
}

module.exports = {
  seedUsers,
  populateUsers
}
