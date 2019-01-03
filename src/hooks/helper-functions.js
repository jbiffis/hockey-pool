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


module.exports = {
        getLeague
}