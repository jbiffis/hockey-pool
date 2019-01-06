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
    isActive:       { type: Boolean, required: true, default: true }, // This gets set to false before deletion
    currentPlayers: { type: Object, required: false},
    pastPlayers:    { type: Object, required: false},   // When a player gets dropped, move him from current to past.  Yes there can be dupes.
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
const playerModel = {
  playerId: { type: String, required: true},
  fullName:       { type: String, required: true },
  nhl_id:         { type: Number, required: true },
  primaryPosition:{ type: String, required: true }
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