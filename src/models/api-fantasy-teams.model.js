// api/fantasy-teams-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiFantasyTeams = new Schema({
    owner: { type: Object, required: true },
    teamName: {type: String, required: true },
    currentPlayers: {type: Object, required: false},  // when a player gets added, put them here.
    pastPlayers: {type: Object, required: false},   // When a player gets dropped, move him from current to past.  Yes there can be dupes.
    pointSummary: {type: Object, required: false},  // Every day add a new line with each current players points from today's games
    teamPoints: {type: Object, required: false}   // Every day add a new item with current totals.
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiFantasyTeams', apiFantasyTeams);
};

/**********************************************
 * playerModes:
 * {fullname, currentTeam, position, nhl_id, playerId, dateAcquired, dateRemoved}
 * 
 * pointSummary: 
 * {fullname, nhl_id, player_id, position date, stats:{all of the stat categories they care about eg: G, P, SH, etc}}
 * 
 * 
 */