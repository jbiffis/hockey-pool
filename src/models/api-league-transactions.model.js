// api/league-transactions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiLeagueTransactions = new Schema({
    type: { type: String, required: true },     // Add, drop
    leagueId: {type: String, required: true},     // The league
    teamId: { type: String, required: true },     // The fantasy team doing the transaction
    playerId: {type: Object, required: true },    // Should be {String playerId, String fullName}
    ip_address: {type: String, required: true}  // We should save some data for audit purposes.
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiLeagueTransactions', apiLeagueTransactions);
};
