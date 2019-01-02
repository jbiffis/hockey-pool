// Validate all rules for adding a team to a league
// Rules are: 
// - Adding this team must stay under league max teams
// - Adding must be before a certain date/event/flag in db
// - Limit to one team per owner per league

module.exports = function () {
    
    return context => {
        const leagues_service   = context.app.service('api/leagues');
        
        // Async method.  Returns a promise that will contain
        let leagueAcceptingTeam = function(leagueId) {
            return leagues_service.find({query: {
                _id: leagueId
                }
            })
            .then(resp => {
                if (resp.data.length <= 0) {
                    throw new Error("Cannot find league");
                } else {
                    let league = resp.data[0];
                    
                    // Validate current vs max teams
                    if (league.currentTeams + 1 >= league.maxTeams) {
                        throw new Error("League at max number of teams");
                    }

                    // Validate league is accepting new teams.
                    if (!league.acceptingNewTeams) {
                        throw new Error("League not accepting new teams");
                    }

                    return true;
                }
            });
        }

        return Promise.all([
                leagueAcceptingTeam(context.data.league)
            ])
            .then(resp => {
                // resp values are in order of the called functions
                if (resp[0] == false) {
                    throw new Error("Cannot add team to league");
                }

                return context;
            })
    };
  };