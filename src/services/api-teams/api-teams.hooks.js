const teams_check_add = require('../../hooks/teams-check-add.js');
const teams_validation = require('../../hooks/teams-validation.js');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [teams_check_add(), teams_validation()],
    update: [teams_validation()],
    patch: [teams_validation()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
