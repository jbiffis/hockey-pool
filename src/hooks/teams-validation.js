const helpers = require('./helper-functions.js');
const verifyMaxPlayers = require('./team/verify-max-players');
const verifyMaxPlayerPositions = require('./team/verify-max-player-positions');


module.exports = function (options = {}) {
    return async context => {
        return helpers.getLeague(context, context.data.leagueId)
            .then(league => {
                verifyMaxPlayers(league, context.data);
                verifyMaxPlayerPositions(league, context.data);

                return context;
            });        
    }
}

// Team validation this has to validate everything on the team, not just the players
// for the players, need to check
// All players exist
// All players are available (not on waivers, not on another team)
// Max player positions
// Max total players

// these validation things should be in a utility function.  requires