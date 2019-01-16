/* eslint-disable no-console */

// test-psql-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'league_transactions';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.uuid('gid');
        table.string('type').notNullable();
        table.string('season').notNullable().defaultTo('2018-2019');
        table.integer('league_id').notNullable();
        table.integer('team_id').notNullable();
        table.integer('player_id').notNullable();
        table.timestamps(true,true);
      })
      .then(() => console.log(`Created ${tableName} table`))
      .catch(e => console.error(`Error creating ${tableName} table`, e));
  }
});


return db;
};