// Initializes the `api/league` service on path `/api/league`
const createService = require('feathers-mongoose');
const createModel = require('../../models/api-league.model');
const hooks = require('./api-league.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'api-league',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/league', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/league');

  service.hooks(hooks);
};
