// Initializes the `/api/teams` service on path `/api/teams`
const createService = require('feathers-knex');
const createModel = require('../../models/api-teams.model');
const hooks = require('./api-teams.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'teams',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/teams', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/teams');

  service.hooks(hooks);
};