// /api/actions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const apiActions = new Schema({
    action: { type: String, required: true },
    params: { type: Object, required: false }
  }, {
    timestamps: true
  });

  return mongooseClient.model('apiActions', apiActions);
};
