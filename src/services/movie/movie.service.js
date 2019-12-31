// Initializes the `movie` service on path `/movie`
const { Movie } = require('./movie.class');
const createModel = require('../../models/movie.model');
const hooks = require('./movie.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/movie', new Movie(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('movie');

  service.hooks(hooks);
};
