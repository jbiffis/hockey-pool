// Initializes the `/api/teams` service on path `/api/teams`
const createService = require('feathers-mongodb');
const hooks = require('./api-teams.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/api/teams', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/teams');

  mongoClient.then(db => {
    service.Model = db.collection('api/teams');
  });

  service.hooks(hooks);
};

