// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('./helper-functions.js');

// eslint-disable-next-line no-unused-vars
markTeamDeleted = function (options = {}) {
    return async context => {
        return context.app.service('api/teams')
            .patch(context.id, { 'isActive' : false})
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
        if (context.data && context.data.leagueId) {
            leagueId = context.data.leagueId
        } else {
            let teamId = context.id;
            await helpers.getTeam(context, teamId).then(team => leagueId = team.leagueId);
        }
        
        return helpers.getTeams(context, {query: { leagueId: leagueId, isActive: true } })
          .then(teams => {
            let numberOfTeams = teams.length;

            return context.app.service('api/leagues').patch(leagueId, { 'currentTeams' : numberOfTeams});

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
