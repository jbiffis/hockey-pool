/* eslint-disable no-console */

// test-psql-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'teams';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('owner').unsigned();    // FK
      //table.foreign('owner').references('Users.id')
        table.integer('league_id').unsigned(); // FK
      //table.foreign('leagueId').references('Leagues.id')
        table.string('name');
        table.string('season');
        table.boolean('is_active').notNullable().defaultTo(true);
        table.timestamps(true,true);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};