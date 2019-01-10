const helpers = require('./helper-functions.js');
const verifyMaxPlayerPositions = require('./team/verify-max-player-positions.js');

module.exports = function (options = {}) {
    return async context => {
        return helpers.getLeague(context, context.data.leagueId)
            .then(league => {
                if (context.data.currentPlayers.length > league.teamSettings.maxPlayers) {
                    throw new Error(util.format("Team will have too many players.  Max is %d players per team", league.teamSettings.maxPlayers));
                }

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