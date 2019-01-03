// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('./helper-functions.js');

// eslint-disable-next-line no-unused-vars
setNumberOfTeams = function (options = {}) {
  return async context => {
        let leagueId = context.data.leagueId;
        
        return Promise.all([
            helpers.getLeague(context, leagueId),
            helpers.getTeamsByLeague(context, leagueId)
        ]).then(results => {
            let league = results[0];
            let numberOfTeams = results[1].length;

            return context.app.service('api/leagues').patch(leagueId, { 'currentTeams' : numberOfTeams});
        }).then(resp => {
            return context;
        }).catch(err => {
            throw Error("Problem updating number of teams in a league.");
        });
            
    }
};


module.exports = {
    setNumberOfTeams
}
