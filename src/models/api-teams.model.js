// api/teams-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiTeams = new Schema({
    owner:          { type: Object, required: false },    // See Below!  TODO: Make this required when we're closer to going live
    leagueId:       { type: String, required: true },
    name:           { type: String, required: true },
    season:         { type: String, required: true, default: '2018-2019' },
    isActive:       { type: Boolean, required: true, default: true }, // This gets set to false before deletion
    currentPlayers: { type: Array, required: true, default: [] },  
    pastPlayers:    { type: Array, required: false},   // When a player gets dropped, move him from current to past.  Yes there can be dupes.
    teamPoints:     { type: Object, required: false }   // Every day add a new item with current totals.
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiTeams', apiTeams);
};

// Owner should look like this:
const userModel = {
  userId: { type: String, required: true}
}

// Any player should look like this
// Note that you can submit a player with just the Id.  This helps when initially setting up a team
const playerModel = {
  playerId:       { type: String, required: true},
  fullName:       { type: String, required: false },
  nhl_id:         { type: Number, required: false },
  primaryPosition:{ type: String, required: false }
}
/**********************************************
 * playerModes:
 * {fullname, currentTeam, position, nhl_id, playerId, dateAcquired, dateRemoved}
 * 
 * pointSummary: 
 * {fullname, nhl_id, player_id, position date, stats:{all of the stat categories they care about eg: G, P, SH, etc}}
 * 
 * 
 */