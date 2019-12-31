const { authenticate } = require('@feathersjs/authentication').hooks;
const { populateMovieFields } = require('../../hooks/movie')
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [populateMovieFields()],
    get: [populateMovieFields()],
    create: [],
    update: [],
    patch: [],
    remove: []
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
