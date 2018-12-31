// Validate all rules for adding a player to a team
// Rules are: 
// - Player must exist and is eligable to add
// - Cannot have more players than the max
// - Cannot be attempting more adds than permitted this period
// - Cannot be attempting more adds than permitted in the season?
// - Cannot have more F/D than allowed?
// - Cannot have more G than allowed?

module.exports = function () {
    
    return context => {
        const players_service   = context.app.service('api/players');
        const teams_service     = context.app.service('api/teams');
        const leagues_service   = context.app.service('api/leagues');


        // These are the rules around adding a player
        
        // Async method.  Returns a promise that will contain
        // true/false
        let playerEligableForAdd = function(playerId) {
            return players_service.find({query: {
                _id: playerId
                }
            })
            .then(resp => {
                // resp values are in order of the called functions
                if (resp.data.length >= 1) {
                    throw new Error("Player being added alreay exists");
                } else {
                    return context;
                }
            });
        }

        let checkMaxTeamPlayers = function(teamId) {

        }

        let checkAddsLimit = function(teamId) {

        }

        Promise.all([
            playerEligableForAdd(context.data.player._id),
            checkAddsLimit(context.data.team._id),
            checkMaxTeamPlayers(context.data.team._id)
        ])
        .then(resp => {
            // resp values are in order of the called functions
            if (resp.data.length >= 1) {
                throw new Error("Player being added alreay exists");
            } else {
                return context;
            }
        })
    };
  };