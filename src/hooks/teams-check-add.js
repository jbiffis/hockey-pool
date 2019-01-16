// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('./helper-functions.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    return helpers.getLeagueTeams(context, context.data.league_id)
        .then(league => {
          // Validate current vs max teams
          if (league.currentTeams.length + 1 >= league.maxTeams) {
              throw new Error("League at max number of teams");
          }

          // Validate league is accepting new teams.
          if (!league.allow_new_teams) {
              throw new Error("League not accepting new teams");
          }

          return context;
    })
  };
};
