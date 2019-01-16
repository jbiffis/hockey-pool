// Initializes the `api-users` service on path `/api-users`
const createService = require('feathers-knex');
const createModel = require('../../models/api-users.model');
const hooks = require('./api-users.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/users', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/users');

  service.hooks(hooks);
};
