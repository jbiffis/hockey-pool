// api/league-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const defScoringSettings = {

}

const defTeamSettings = {
  maxPlayers: 10,
  maxPerPosition: {'F': 0, 'D': 0, 'RW': 0, 'LW': 0, 'C': 0, 'G': 0}
}

const defTransSettings = {
  addsPerWeek: 10,
  addsPerSeason: 10,
  waiverTime: -1
}

// Owner/Commish should look like this:
const userModel = {
  userId: { type: String, required: true}
}

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiLeague = new Schema({
    name:           { type: String, required: true },
    description:    { type: String, required: false },
    avatar:         { type: String, required: false },
    owners:         { type: Object, required: false },    // This shouuld be a link to a user. {String userId, String name, String handle}
    commish:        { type: Object, required: true },
    season:         { type: String, required: true, default: '2018-2019' },
    scoringSettings:{ type: Object, required: false, default: defScoringSettings },
    transSettings:  { type: Object, required: true, default: defTransSettings },
    teamSettings:   { type: Object, required: true, default: defTeamSettings },
    allowNewTeams:  { type: Boolean, required: true, default: true },
    currentTeams:   { type: Number, required: true, default: 0 },
    maxTeams:       { type: Number, required: false }
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiLeague', apiLeague);
};

