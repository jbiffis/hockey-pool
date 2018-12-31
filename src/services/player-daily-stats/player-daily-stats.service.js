// Initializes the `player-daily-stats` service on path `/player-daily-stats`
const createService = require('feathers-mongoose');
const createModel = require('../../models/player-daily-stats.model');
const hooks = require('./player-daily-stats.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'player-daily-stats',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/player-daily-stats', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('player-daily-stats');

  service.hooks(hooks);
};
