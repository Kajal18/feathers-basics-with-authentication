const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const { populateUserFields } = require('../../hooks/user')
module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), populateUserFields()],
    get: [authenticate('jwt'), populateUserFields()],
    create: [hashPassword('password')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
