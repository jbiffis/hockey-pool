// Validate all rules for adding a team to a league
// Rules are: 
// - Adding this team must stay under league max teams
// - Adding must be before a certain date/event/flag in db
// - Limit to one team per owner per league

// Helper Functions

let getLeague = function(context, leagueId) {
    const leagues_service   = context.app.service('api/leagues');

    return leagues_service.find({query: {
        _id: leagueId
        }
    })
    .then(resp => {
        if (resp.data.length <= 0) {
            throw new Error("Cannot find league");
        }

        return resp.data[0];
    })
}

let getTeamsByLeague = function(context, leagueId) {
    const teams_service   = context.app.service('api/teams');

    return teams_service.find({query: {
        leagueId: leagueId
        }
    })
    .then(resp => {
        if (resp.data.length < 0) {
            throw new Error("Error getting teams for league");
        }

        return resp.data;
    })
}


// Team validation functions

// Pass in a string, return a modified string or false if cannot be fixed
// Rules are: None!
let valName = function(str) {
    return str;
} 


module.exports = {
        getLeague,
        getTeamsByLeague,
        team: {
            valName
        }
}