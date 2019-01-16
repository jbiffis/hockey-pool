// Initializes the `api/league` service on path `/api/league`
const createService = require('feathers-knex');
const createModel = require('../../models/api-league.model');
const hooks = require('./api-league.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'leagues',
    Model,
    paginate,
    id: 'id'
  };

  // Initialize our service with any options it requires
  app.use('/api/leagues', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/leagues');

  service.hooks(hooks);
};
