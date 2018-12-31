// Initializes the `/api/fantasy/teams` service on path `/api/fantasy/teams`
const createService = require('feathers-mongodb');
const hooks = require('./api-fantasy-teams.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/api/fantasy/teams', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/fantasy-teams');

  mongoClient.then(db => {
    service.Model = db.collection('api-fantasy-teams');
  });

  service.hooks(hooks);
};

