// Initializes the `api/league-transactions` service on path `/api/league/transactions`
const createService = require('feathers-knex');
const createModel = require('../../models/api-league-transactions.model');
const hooks = require('./api-league-transactions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'league_transactions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/leagues/transactions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/leagues/transactions');

  service.hooks(hooks);
};
