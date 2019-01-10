// Validate all rules for adding a player to a team
// Rules are: 
// - Player must exist, team must exist, league must exist.
// - eligable to add ?? What is this?
// - Cannot have more players than the max
// - Cannot be attempting more adds than permitted this period
// - Cannot be attempting more adds than permitted in the season?
// - Cannot have more F/D than allowed?
// - Cannot have more G than allowed?
const util = require('util');
const _ = require('lodash');
const helpers = require('./helper-functions.js');
const verifyMaxPlayerPositions = require('./team/verify-max-player-positions.js');
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

let validateRequest = function (options = {}) {
    return context => {
        if (context.data.type != 'add' && context.data.type != 'drop') { throw new Error("Invalid Transaction Type") }
        if (!context.data.playerId) { throw new Error("Missing playerId") }
        if (!context.data.leagueId) { throw new Error("Missing leagueId") }
        if (!context.data.teamId) { throw new Error("Missing teamId") }

        return context;
    }
}

// Add a hook to add the following to the transaction
        // Username
        // IP Address 

let addPlayer = function (options = {}) {
    return context => {
        if (context.data.type != 'add') {
            return context;         // This hook only does adds.  Drops are done elsewhere
        }    

        return Promise.all([
            // We need the league, the team, the player, and the players on the team already, team transactions
            helpers.getPlayer(context, context.data.playerId),
            helpers.getLeague(context, context.data.leagueId),
            helpers.getTeam(context, context.data.teamId),
            helpers.getTeamTransactions(context, context.data.teamId)
        ])
        .then(responses => {
            // resp values are in order of the called functions.
            let player = responses[0];
            let league = responses[1];
            let team = responses[2];
            let transactions = responses[3]

            // Check for max players on the team
            if (team.currentPlayers.length + 1 > league.teamSettings.maxPlayers) {
                throw new Error(util.format("Team will have too many players.  Max is %d players per team", league.teamSettings.maxPlayers));
            } 

            // Check number of adds this week is ok.
            const weekTransactions = _.sumBy(
                transactions,
                ({ x }) => Number(x.createdAt > ( new Date().getTime() - ONE_WEEK_MS) )
            );

            if (weekTransactions == league.transSettings.addsPerWeek) {
                throw new Error("Too many transactions this week");
            }

            // TODO: Check if player already exists on this team.

            const playerToAdd = {
                playerId: player._id,
                fullName: player.fullName,
                nhl_id: player.nhl_id,
                primaryPosition: player.primaryPosition
            }

            team.currentPlayers.push(playerToAdd);

            // Verify the number of players in each position is ok
            verifyMaxPlayerPositions(league, team);

            return context.app.service('api/teams').patch(context.data.teamId, {currentPlayers: team.currentPlayers})
        })
        .then(resp => {
            return context;
        })
    }
};

let dropPlayer = function(options = {}) {
    return context => {
        if (context.data.type != 'drop') {
            return context;         // This hook only does adds.  Drops are done elsewhere
        }    
    }
};


module.exports = {
    validateRequest,
    addPlayer,
    dropPlayer
}
