// This validates the players on a team with the max per position specified by the league settings
const util = require('util');

module.exports = function(league, team) {
    // Check for max per position
    // iterate through the array league.maxPerPosition and check what is in team.current_players
    if (!team.current_players || team.current_players.length == 0) {
        return;
    }

    let playerPosCounts = {'F': 0, 'D': 0, 'RW': 0, 'LW': 0, 'C': 0, 'G': 0};

    team.current_players.forEach(player => {
        playerPosCounts[player.primary_position]++;
    })

    // If league settings don't break down F into their positions, then sum up the Forward positions
    if (league.max_per_position['F'] > 0) {
        let currentNumberOfPlayers = playerPosCounts['RW'] + playerPosCounts['C'] + playerPosCounts['LW'];

        if (currentNumberOfPlayers > max) {
            throw new Error(util.format("Team has %d/%d players in position %s", currentNumberOfPlayers, league.max_per_position['F'], ['F']))
        }
    // Otherwise everything is as you would imagine -- Just check current players in that positon against the max.
    } else {
        ['RW','C','LW'].forEach(pos => {
            if (playerPosCounts[pos] > league.max_per_position[pos]) {
                throw new Error(util.format("Team has %d/%d players in position %s", playerPosCounts[pos], league.max_per_position[pos], pos))
            }
        })
    }
    // And now Defense and Goalies
    ['D','G'].forEach(pos => {
        if (playerPosCounts[pos] > league.max_per_position[pos]) {
            throw new Error(util.format("Team has %d/%d players in position %s", playerPosCounts[pos], league.max_per_position[pos], pos))
        }
    })

    return;
}