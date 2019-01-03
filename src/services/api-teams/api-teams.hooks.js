const teamsCheckAdd = require('../../hooks/teams-check-add');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [teamsCheckAdd()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [/* Increment league.currentTeams  */],
    update: [],
    patch: [],
    remove: [/* Decrement league.currentTeams */]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
