// This validates the players on a team with the max per position specified by the league settings
const util = require('util');

module.exports = function(league, team) {
    // Check for max per position
    // iterate through the array league.teamSettings.maxPerPosition and check what is in team.currentPlayers
    if (team.currentPlayers.length == 0) {
        return;
    }

    let playerPosCounts = {'F': 0, 'D': 0, 'RW': 0, 'LW': 0, 'C': 0, 'G': 0};

    team.currentPlayers.forEach(player => {
        playerPosCounts[player.primaryPosition]++;
    })

    // If league settings don't break down F into their positions, then sum up the Forward positions
    if (league.teamSettings.maxPerPosition['F'] > 0) {
        let currentNumberOfPlayers = playerPosCounts['RW'] + playerPosCounts['C'] + playerPosCounts['LW'];
        let max = league.teamSettings.maxPerPosition['F'];

        if (currentNumberOfPlayers > max) {
            throw new Error(util.format("Team has %d/%d players in position %s", currentNumberOfPlayers, max, ['F']))
        }
    // Otherwise everything is as you would imagine -- Just check current players in that positon against the max.
    } else {
        ['RW','C','LW'].forEach(pos => {
            if (playerPosCounts[pos] > league.teamSettings.maxPerPosition[pos]) {
                throw new Error(util.format("Team has %d/%d players in position %s", playerPosCounts[pos], league.teamSettings.maxPerPosition[pos], pos))
            }
        })
    }
    // And now Defense and Goalies
    ['D','G'].forEach(pos => {
        if (playerPosCounts[pos] > league.teamSettings.maxPerPosition[pos]) {
            throw new Error(util.format("Team has %d/%d players in position %s", playerPosCounts[pos], league.teamSettings.maxPerPosition[pos], pos))
        }
    })

    return;
}