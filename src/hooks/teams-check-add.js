// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('./helper-functions.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    return helpers.getLeague(context, context.data.leagueId)
        .then(league => {
          // resp values are in order of the called functions
          // Validate current vs max teams
          if (league.currentTeams + 1 >= league.maxTeams) {
              throw new Error("League at max number of teams");
          }

          // Validate league is accepting new teams.
          if (!league.acceptingNewTeams) {
              throw new Error("League not accepting new teams");
          }

          return context;
    })
  };
};
