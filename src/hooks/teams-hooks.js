// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('./helper-functions.js');

// eslint-disable-next-line no-unused-vars
markTeamDeleted = function (options = {}) {
    return async context => {
        return context.app.service('api/teams')
            .patch(context.id, { 'is_active' : false})
            .then(resp => {
                return context;
            });
    }
};

// eslint-disable-next-line no-unused-vars
setNumberOfTeams = function (options = {}) {
  return async context => {
        let leagueId;
        // This function is called both by adding and removing a team.  When we are removing a team we don't 
        // know what the league id is.  We need to find it first.
        if (context.data && context.data.league_id) {
            leagueId = context.data.league_id
        } else {
            let teamId = context.id;
            await helpers.getTeam(context, teamId).then(team => leagueId = team.league_id);
        }
        
        return helpers.getLeague(context, leagueId)
          .then(league => {
            league.current_teams++;
            return context.app.service('api/leagues').update(leagueId, league);
        }).then(resp => {
            return context;
        }).catch(err => {
            throw Error("Problem updating number of teams in a league.");
        });
            
    }
};


module.exports = {
    markTeamDeleted,
    setNumberOfTeams
}
