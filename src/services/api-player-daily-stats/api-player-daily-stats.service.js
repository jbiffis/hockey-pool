// Initializes the `api/player-daily-stats` service on path `/api/player-daily-stats`
const createService = require('feathers-knex');
const createModel = require('../../models/api-player-daily-stats.model');
const hooks = require('./api-player-daily-stats.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'player-daily-stats',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/player-daily-stats', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/player-daily-stats');

  service.hooks(hooks);
};
