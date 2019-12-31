const user = require('./user/user.service.js');
const movie = require('./movie/movie.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(movie);
};
