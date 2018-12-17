// api/players-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiPlayers = new Schema({
    firstName:      { type: String, required: false },
    lastName:       { type: String, required: false },
    fullName:       { type: String, required: true },
    nhl_id:         { type: Number, required: true },
    number:         { type: Number, required: true },
    birthDate:      { type: Date,   required: false },
    shootsCatches:  { type: String, required: false },
    currentTeam:    { type: Object, required: false },
    primaryPosition:{ type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiPlayers', apiPlayers);
};
