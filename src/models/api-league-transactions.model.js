// api/league-transactions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiLeagueTransactions = new Schema({
    type: { type: String, required: true },     // Add, drop
    league: {type: String, required: true},     // The league
    team: { type: String, required: true },     // The fantasy team doing the transaction
    player: {type: String, required: true },
    ip_address: {type: String, required: true}  // We should save some data for audit purposes.
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiLeagueTransactions', apiLeagueTransactions);
};
