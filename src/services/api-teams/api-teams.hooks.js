const teamsCheckAdd = require('../../hooks/teams-check-add');
const teamsValidation = require('../../hooks/teams-validation');
const {
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
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [setNumberOfTeams()],
    update: [],
    patch: [],
    remove: [setNumberOfTeams()]
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
