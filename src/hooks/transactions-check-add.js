// Validate all rules for adding a player to a team
// Rules are: 
// - Player must exist, team must exist, league must exist.
// - eligable to add ?? What is this?
// - Cannot have more players than the max
// - Cannot be attempting more adds than permitted this period
// - Cannot be attempting more adds than permitted in the season?
// - Cannot have more F/D than allowed?
// - Cannot have more G than allowed?
const helpers = require('./helper-functions.js');
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

function hook(context) {
    // These are the rules around adding a player

    if (!context.data.playerId) {
        throw new Error("Missing playerId")
    }

    if (!context.data.leagueId) {
        throw new Error("Missing leagueId")
    }

    if (!context.data.teamId) {
        throw new Error("Missing teamId")
    }

    Promise.all([
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

        // Check for max players on the team
        if (team.currentPlayers.length + 1 > league.teamSettings.maxPlayers) {
            throw new Error("Team will have too many players");
        }

        // Check for max breakdown
        // iterate through the array league.teamSettings.maxPerPosition and check what is in team.currentPlayers

        // Check number of adds this week is ok.
        // CHeck the transactions table.

        // Another hoook for More player data to the context

        
        // Add a hook to add the following to the transaction
        // Username
        // IP Address        

        // Add another new hook to actually do the transaction
    })
};

module.exports = function() { return hook };