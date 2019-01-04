const apiPlayers = require('./api-players/api-players.service.js');
const apiTeams = require('./api-teams/api-teams.service.js');
const apiActions = require('./api-actions/api-actions.service.js');
const apiLeagueTransactions = require('./api-league-transactions/api-league-transactions.service.js');
const apiLeague = require('./api-league/api-league.service.js');
const apiPlayerDailyStats = require('./api-player-daily-stats/api-player-daily-stats.service.js');
const apiUsers = require('./api-users/api-users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apiPlayers);
  app.configure(apiTeams);
  app.configure(apiActions);
  app.configure(apiLeagueTransactions);
  app.configure(apiLeague);
  app.configure(apiPlayerDailyStats);
  app.configure(apiUsers);
};