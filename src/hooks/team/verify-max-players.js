// Checks to see if the current number of players on a team will be over the max

module.exports = function(league, team) {
    if (context.data.currentPlayers.length > league.teamSettings.maxPlayers) {
        throw new Error(util.format("Team will have too many players.  Max is %d players per team", league.teamSettings.maxPlayers));
    }
}