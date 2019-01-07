// api/league-transactions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiLeagueTransactions = new Schema({
    type:       { type: String, required: true },     // Add, drop
    season:     { type: String, required: true, default: '2018-2019' },
    leagueId:   { type: String, required: true },     // The league
    teamId:     { type: String, required: true },     // The fantasy team doing the transaction
    playerId:   { type: Object, required: true }     // Should be {String playerId, String fullName}
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiLeagueTransactions', apiLeagueTransactions);
};
