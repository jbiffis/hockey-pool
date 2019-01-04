// api-users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const apiUsers = new mongooseClient.Schema({
  
    email: {type: String, unique: true, lowercase: true},
    password: { type: String },
  
    googleId: { type: String },
    facebookId: { type: String },
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiUsers', apiUsers);
};
