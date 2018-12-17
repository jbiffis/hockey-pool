// Initializes the `/api/actions` service on path `/api/actions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/api-actions.model');
const hooks = require('./api-actions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'api-actions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/actions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/actions');

  service.hooks(hooks);
};
