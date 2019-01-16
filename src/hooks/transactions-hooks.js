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
        if (!context.data.player_id) { throw new Error("Missing player_id") }
        if (!context.data.player_id) { throw new Error("Missing player_id") }
        if (!context.data.team_id) { throw new Error("Missing team_id") }

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
            helpers.getPlayer(context, context.data.player_id),
            helpers.getLeague(context, context.data.league_id),
            helpers.getTeamPlayers(context, context.data.team_id),
            helpers.getTeamTransactions(context, context.data.team_id)
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


            // TODO This all changes to just setting them in the player league thing;
            
            const playerToAdd = {
                player_id: player.id,
                full_name: player.fullName,
                nhl_id: player.nhl_id,
                primary_position: player.primaryPosition
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
