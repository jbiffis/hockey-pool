// api/league-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiLeague = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    avatar: { type: String, required: false },
    owners: { type: Object, required: false },    // This shouuld be a link to a user. {String userId, String name, String handle}
    commish: { type: String, required: false },
    scoringSettings: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiLeague', apiLeague);
};
