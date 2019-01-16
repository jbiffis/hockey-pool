// api/players-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'players';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('full_name');
        table.integer('nhl_id');
        table.integer('number');
        table.date('birthdate');
        table.string('shoots_catches');
        table.string('current_shortTeam');
        table.string('current_team');
        table.string('primary_position');
        table.timestamps(true,true);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
