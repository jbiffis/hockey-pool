const apiPlayers = require('./api-players/api-players.service.js');
const apiFantasyTeams = require('./api-fantasy-teams/api-fantasy-teams.service.js');
const apiTeams = require('./api-teams/api-teams.service.js');
const apiActions = require('./api-actions/api-actions.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apiPlayers);
  app.configure(apiFantasyTeams);
  app.configure(apiTeams);
  app.configure(apiActions);
};
