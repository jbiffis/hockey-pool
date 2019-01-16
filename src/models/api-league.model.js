/* eslint-disable no-console */

// test-psql-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
const defTransSettings = JSON.stringify({
  addsPerWeek: 10,
  addsPerSeason: 10,
  waiverTime: -1
});

const defMaxPerPosition = JSON.stringify({'F': 0, 'D': 0, 'RW': 0, 'LW': 0, 'C': 0, 'G': 0});


module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'leagues';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.uuid('gid');
        table.integer('commish').unsigned();    // FK
      //table.foreign('owner').references('Users.id')
        table.string('name').notNullable();
        table.string('season').notNullable();
        table.string('description');
        table.string('avatar');
        table.boolean('allow_new_teams').notNullable().defaultTo(true);
        table.integer('max_teams').notNullable();
        table.json('scoring_categories');
        table.integer('current_teams').notNullable().defaultTo(0);
        table.json('max_players_position').notNullable().defaultTo(defMaxPerPosition);
        //table.integer('max_players').notNullable();  I'm pretty sure this is useless
        table.json('trans_settings').notNullable().defaultTo(defTransSettings);
        table.timestamps(true,true);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};