const teamsCheckAdd = require('../../hooks/teams-check-add');
const teamsValidation = require('../../hooks/teams-validation');
const {
  markTeamDeleted,
  setNumberOfTeams
} = require('../../hooks/teams-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [teamsCheckAdd(), teamsValidation()],
    update: [],
    patch: [],
    remove: [markTeamDeleted(), setNumberOfTeams()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [setNumberOfTeams()],
    update: [],
    patch: [],
    remove: []
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
