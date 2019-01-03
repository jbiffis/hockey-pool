// Validate all rules for adding a team to a Team
// Rules are: 
// - Adding this team must stay under Team max teams
// - Adding must be before a certain date/event/flag in db
// - Limit to one team per owner per Team

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

let getTeam = function(context, teamId) {
    const teams_service   = context.app.service('api/teams');

    return teams_service.find({query: {
        _id: teamId
        }
    })
    .then(resp => {
        if (resp.data.length <= 0) {
            throw new Error("Cannot find team");
        }

        return resp.data[0];
    })
}

let getTeams = function(context, params) {
    const teams_service   = context.app.service('api/teams');

    return teams_service.find(params)
    .then(resp => {
        if (resp.data.length < 0) {
            throw new Error("Error getting teams for League");
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
    getTeam,
    getTeams,
    team: {
        valName
    }
}