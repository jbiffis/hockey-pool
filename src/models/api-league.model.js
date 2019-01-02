// api/league-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const defScoringSettings = {

}

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiLeague = new Schema({
    name:           { type: String, required: true },
    description:    { type: String, required: false },
    avatar:         { type: String, required: false },
    owners:         { type: Object, required: false },    // This shouuld be a link to a user. {String userId, String name, String handle}
    commish:        { type: String, required: false },
    scoringSettings:{ type: Object, required: false, default: defScoringSettings },
    allowNewTeams:  { type: Boolean, required: true, default: true },
    currentTeams:   { type: Number, required: true, default: 0 },
    maxTeams:       { type: Number, required: false }
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiLeague', apiLeague);
};
